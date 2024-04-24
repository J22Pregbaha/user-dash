import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations'; // Import animation-related functions

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pagesArray: number[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    let apiUrl = `https://reqres.in/api/users?page=${this.currentPage}`;

    this.http.get<any>(apiUrl)
      .subscribe(response => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.loading = false;
      }, error => {
        console.error(error);
        this.loading = false;
      });
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchUsers();
  }

  navigateToUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}
