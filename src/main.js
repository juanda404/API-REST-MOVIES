//DATA

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params:{
        'api_key': API_KEY,
    },
});
//local Store
function likedMovieList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    if (item) {
        movies = item;
    }else{
        movies ={};
    }
    return movies;
}

function likeMovie(movie){

    const likedMovies = likedMovieList();
    console.log(likedMovies);
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    }else{
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
}

//Util

const lazyloader = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }

        ;
    });
});


function createMovies(movies, container, {clean=true,}={},){

    if (clean){
        container.innerHTML ='';
    }
  

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
  

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('data-img','https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        movieImg.addEventListener('click', () =>{
            location.hash = '#movie='+ movie.id;
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click',()=>{
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
        })



        lazyloader.observe(movieImg);

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = '';
    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+category.id);
        categoryTitle.addEventListener('click', ()=> {
            location.hash = `#category=${category.id}-${category.name}`;
            });


        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
        
    });

}

//call back  a la API
async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);

}
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    //categoriesPreviewList
    createCategories(categories,categoriesPreviewList );
}


async function getMoviesByCategory(id){
    const { data } = await api('discover/movie',{
        params:{
            with_genres: id,
        }
    });
    const movies = data.results;

    createMovies(movies, genericSection);

}


async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params:{
            query,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection);

}

function getPaginatedMoviesBySearch(query){
    return async function (){
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight -15);
    
        if (scrollIsBottom) {
            page++;
            const { data } = await api('search/movie',{
            params: {
                query,
                page,
            },
        });
        const movies = data.results;
        maxPage 
    
        createMovies(movies,genericSection,{clean:false});
        }
    }
}


async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies,genericSection,{clean:true});

   // const btnloadMore = document.createElement('button');
   // btnloadMore.innerText = 'Load more';
   // btnloadMore.addEventListener('click', getPaginatedTrendigMovies);
    //genericSection.appendChild(btnloadMore);
}


async function getPaginatedTrendingMovies(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight -15);

    if (scrollIsBottom) {
        page++;
        const { data } = await api('trending/movie/day',{
        params: {
            page,
        },
    });
    const movies = data.results;

    createMovies(movies,genericSection,{clean:false});
    }


//    const btnloadMore = document.createElement('button');
//    btnloadMore.innerText = 'Load more';
//    btnloadMore.addEventListener('click', getPaginatedTrendigMovies);
//    genericSection.appendChild(btnloadMore);
}




async function getMovieById(id){
    const { data: movie } = await api('movie/'+id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500'+movie.poster_path;
    headerSection.style.background = `url(${movieImgUrl})`;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres,movieDetailCategoriesList);

    getRelatedMoviesId(id);

}

async function getRelatedMoviesId(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relateMovies = data.results;

    createMovies(relateMovies,relatedMoviesContainer);

}

function getLikedMovies(){
    const likedMovies = likedMovieList();
    const moviesArray = Object.values(likedMovies);
    createMovies(moviesArray, likedMoviesListArticle);
    console.log(likedMovies);
}

