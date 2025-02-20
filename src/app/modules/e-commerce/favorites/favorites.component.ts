import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../../../core/models/wishlist';
import { WishlistService } from '../../../core/services/wishlist.service';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  wishlistItems: Wishlist[] = [];

  constructor(
    private wishlistService: WishlistService,
    private sharedService: SharedService
  ) {}

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
