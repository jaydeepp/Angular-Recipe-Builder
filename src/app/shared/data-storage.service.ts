import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        //    return this.httpClient.put('https://ng-recipe-book-ca1b8.firebaseio.com/recipes.json', this.recipeService.getRecipes()
        //    ,{
        //        observe:'body',
        //        params:new HttpParams().set('auth',token)
        //    }
        //    );

        const req = new HttpRequest('PUT', 'https://ng-recipe-book-ca1b8.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress:true ,params: new HttpParams().set('auth', token) });
        return this.httpClient.request(req);
    }

    getRecipes() {

        const token = this.authService.getToken();
        // const headers = new HttpHeaders().set('Bearer','asldjflsjdlfjsf');

        this.httpClient.get<Recipe[]>('https://ng-recipe-book-ca1b8.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
            //  headers:headers
        })
            .pipe(map((recipes) => {
                //  console.log(recipes);
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        // console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }))
            .subscribe((recipes: Recipe[]) => {

                this.recipeService.setRecipes(recipes);
            });
    }

}