import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


@Injectable()
export class DishService {

  dish: Dish;

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

getDishes(): Observable<Dish[]> {
return this.restangular.all('dishes').getList();
}

getDish(id: number): Observable<Dish> {
return  this.restangular.one('dishes',id).get();
}

getFeaturedDish(): Observable<Dish> {
return this.restangular.all('dishes').getList({featured: true})
.map(dishes => dishes[0]);
}

getDishIds(): Observable<number[]> | any {
return this.getDishes()
.map(dishes => { return dishes.map(dish => dish.id) })
.catch(error => { return error; } );
}

}