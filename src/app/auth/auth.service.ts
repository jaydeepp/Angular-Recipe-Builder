import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{

    constructor(private router:Router){}

    token:string;

    signupUser(email:string,password:string){
        console.log("in signupuser service method");

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .catch((error)=>{
           console.log(error);
        })

    };

    signinUser(email:string,password:string){

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
        (response) =>{
            this.router.navigate(["/recipes"]);
            firebase.auth().currentUser.getIdToken()
            .then(
                (token:string)=>{

                    this.token = token;
                }
            )
        }
        )
        .catch(
            response => console.log(response)
        )
    };

    getToken(){

        firebase.auth().currentUser.getIdToken()
        .then(
            (token:string)=>{

                this.token = token;
            }
        )
            return this.token;
    };

    isAuthenticated(){

        return this.token != null;
    };

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
}