import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ICategory } from '../interfaces/ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(private userData: UserService) {}

  ngOnInit(): void {
    this.userData.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
