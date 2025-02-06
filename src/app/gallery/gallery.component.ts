import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovies } from '../imovies';
import { FormsModule, NgModel } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-gallery',
  imports: [FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{

private readonly moviesService= inject(MoviesService);
movies:IMovies[]=[];
searchTerm!:String;
searchArray:IMovies[]=[]
filteredMovies:IMovies[]=[];
moviesSearched:String='';
ngOnInit():void{
  this.moviesService.getMovies().subscribe(
    {
      next: (res)=> {
       this.movies=res.results;
        console.log(res.results);
      },
      error: (err)=>{
        console.log(err);
      }
    }
  )

}


search(el:HTMLDivElement): void {
  let sum='';
 for(var i=0; i<this.movies.length;i++){
  if(this.movies[i].title.toLowerCase().includes(this.searchTerm.toLowerCase())){
    this.searchArray.push(this.movies[i])
    sum+=` 
            <div class="col-md-3 g-5">

            <div  class="card h-100 d-flex justify-content-center">
                <img class="card-img-top" [src]=" 'https://image.tmdb.org/t/p/original' + ${this.movies[i].poster_path}" alt="Title" />
                <div class="card-body d-flex flex-column justify-content-start pinkish">
                    <h4 class="card-title">${this.movies[i].title}${this.movies[i].title}</h4>
                    <p class="card-text">${this.movies[i].overview}</p>

                    
                </div>
                <div class=" bg-secondary" > Rating: ${this.movies[i].vote_average}</div>
            </div>
            
            
            
        </div>
        
          
          
            
        `
     }
     
    }
    
  el.innerHTML=sum;
  console.log(this.searchArray);

}

openDetails(element: HTMLDivElement, element2: HTMLDivElement): void {
  element2.classList.remove("d-none");
  element2.classList.add("z-3");
  document.body.classList.add("opacity"); 
  document.body.scroll
}

closeDetails(primaryCard: HTMLDivElement, detailsCard: HTMLDivElement): void {
  detailsCard.classList.add("d-none");
  detailsCard.classList.remove("z-3");
  document.body.classList.remove("overlay-active"); 
}



  


}




