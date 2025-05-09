import { Component, inject, input, output, signal } from '@angular/core';
import { CommentResponse } from '../../../../../core/models/comment';
import { DatePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SharedService } from '../../../../../core/services/shared.service';
import { CommentService } from '../../../../../core/services/comment.service';
import { Token } from '../../../../../shared/interfaces/auth';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'product-comments',
  templateUrl: './comments.component.html',
  imports: [DatePipe, MatIconButton, MatIcon, MatInput],
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  comments = input<CommentResponse[]>([]);
  productId = input<number>(0);

  private sharedService = inject(SharedService);
  private commentService = inject(CommentService);

  isEditing = signal(false);
  isCreating = signal(false);
  isReplying = signal(false);

  user = signal<Token | null>(null);

  editValue = signal<string>('');
  createValue = signal<string>('');

  defaultComment: CommentResponse = {
    id: 0,
    content: '',
    productId: this.productId(),
    status: 1,
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
    parentCommentId: null,
    userId: 0
  };

  commentSelected = signal<CommentResponse>(this.defaultComment);

  reload = output();

  ngOnInit(): void {
    this.user.set(this.sharedService.getDecodedToken());
    console.log(this.user());
  }

  saveComment() {
    if (this.commentSelected().id === 0) {
      this.commentSelected.update(comment => {
        comment.content = this.createValue();
        return comment;
      });
      this.commentService.create(this.commentSelected()).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this.reload.emit();
            this.createValue.set('');
            this.isCreating.set(false);
            this.reload.emit();
          } else {
            this.sharedService.showAlert('Error al crear comentario', 'Error!');
            this.isCreating.set(false);
          }
        },
        error: error => {
          this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
          this.isCreating.set(false);
        }
      });
    } else {
      this.commentSelected.update(comment => {
        comment.content = this.editValue();
        return comment;
      });
      this.commentService.update(this.commentSelected()).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this.reload.emit();
            this.createValue.set('');
            this.isCreating.set(false);
            this.reload.emit();
          } else {
            this.sharedService.showAlert('Error al actualizar comentario', 'Error!');
            this.isCreating.set(false);
          }
        },
        error: error => {
          this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
          this.isCreating.set(false);
        }
      });
    }

    this.isCreating.set(false);
    this.isEditing.set(false);
    this.isReplying.set(false);
  }

  selectComment(comment: CommentResponse, type: 'reply' | 'edit' | 'create') {
    this.isReplying.set(false);
    this.isCreating.set(false);
    this.isEditing.set(false);
    this.createValue.set('');

    if (type === 'reply') {
      this.commentSelected.set({
        id: 0,
        content: '',
        productId: this.productId(),
        userId: 0,
        status: 1,
        createdAt: new DatePipe('en-Us').transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS') || '',
        updatedAt: new DatePipe('en-Us').transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS') || '',
        parentCommentId: comment.id
      });
      this.isReplying.set(true);
    } else if (type === 'edit') {
      this.commentSelected.set({
        id: comment.id,
        content: comment.content,
        productId: this.productId(),
        userId: 0,
        status: 1,
        createdAt: comment.createdAt,
        updatedAt: new DatePipe('en-Us').transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS') || '',
        parentCommentId: comment.parentCommentId
      });
      this.isEditing.set(true);
    } else if (type === 'create') {
      this.commentSelected.set({
        id: 0,
        content: '',
        productId: this.productId(),
        userId: 0,
        status: 1,
        createdAt: new DatePipe('en-Us').transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS') || '',
        updatedAt: new DatePipe('en-Us').transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS') || '',
        parentCommentId: null
      });
      this.isCreating.set(true);
    }
  }

  deleteComment(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás seguro que quieres eliminar el comentario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.commentService.delete(id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this.sharedService.showAlert('Comentario eliminado con éxito', 'Completado');
              this.reload.emit();
            } else {
              this.sharedService.showAlert('No se pudo eliminar el comentario', 'Error!');
            }
          },
          error: e => {
            this.sharedService.showAlert(e.error.message, 'Error!');
          }
        });
      }
    });
  }

  protected readonly parseInt = parseInt;
}
