import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  comment: Comment;
  commentForm: FormGroup;
  visibility = 'shown';

  formErrors = {
    'rating': '',
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'rating': {
      'required':      'Rating is required.'
    },
    'author': {
      'required':      'Author name is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    },
  };

  constructor(private dishService: DishService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    
  }


  createForm(){
    this.commentForm = this.fb.group({
      rating: ['5', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      date: [''],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data: any){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
  ngOnInit() {
    this.createForm();
    
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';
      },
      errmess => { this.dish = null; this.errMess = <any>errmess; });
  }
  

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    const date = new Date();
    this.comment.date = date.toISOString();
    this.dishcopy.comments.push(this.commentForm.value);
    this.dishcopy.save()
    .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date: new Date()
    });
  }

}