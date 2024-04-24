import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number = 1;
  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userId = +(this.route.snapshot.paramMap.get('id') || 0);
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.http.get<any>(`https://reqres.in/api/users/${this.userId}`)
      .subscribe(response => {
        this.user = response.data;
      });
  }

  goBack(): void {
    this.router.navigate(['/']); // Assuming the user list page URL is '/'
  }
}
