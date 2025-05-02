import { Component, OnInit, inject } from '@angular/core';
import { Wishlist } from '../../../core/models/wishlist';
import { WishlistService } from '../../../core/services/wishlist.service';
import { SharedService } from '../../../core/services/shared.service';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  imports: [ButtonComponent, DecimalPipe]
})
export default class FavoritesComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  private sharedService = inject(SharedService);

  wishlistItems: Wishlist[] = [];

  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems(): void {
    this.wishlistService.list().subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.wishlistItems = response.result;
        } else {
          this.sharedService.showAlert('No se encontraron productos guardados', 'Advertencia');
        }
      },
      error: error => {
        this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
      }
    });
  }

  removeWishlistItem(itemId: number): void {
    this.wishlistService.delete(itemId).subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.getWishlistItems();
        } else {
          this.sharedService.showAlert('No se pudo eliminar el producto guardado', 'Advertencia');
        }
      },
      error: error => {
        this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
      }
    });
  }
}
