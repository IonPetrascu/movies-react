import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideosSlider from '../videosSlider';
import SimilarMoviesSlider from '../similarMoviesSlider';
import TopCast from '../topCast';
function MovieDetail() {
  const [movie, setMovie] = useState();
  const [videoId, setVideoId] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [topCast, setTopCast] = useState([]);
  const [activeComment, setActiveComment] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovies();
    getTopCast();
    getSimilar();
    getVideos();
    getRecommendations();
    getReviews();
  }, [id]);

  const getMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${
        id ? id : '1'
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );
    setMovie(data);
  };
  const getSimilar = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );
    setSimilarMovies(data.results);
  };
  const getVideos = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setVideoId(data.results);
  };
  const getRecommendations = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setRecommendations(data.results);
  };
  const getTopCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setTopCast(data.cast);
  };
  const getReviews = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setReviews(data.results);
  };

  const handleComment = (id) => {
    activeComment !== id ? setActiveComment(id) : setActiveComment(null);
  };
  return (
    <div>
      {movie && movie.backdrop_path && (
        <div className="max-w-[1500px] h-[600px] mx-auto relative rounded-t-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black bg-black/50"></div>
          <img
            className="w-full h-full object-cover object-center"
            src={`https://image.tmdb.org/t/p/original/${movie ? movie.backdrop_path : ''}`}
            alt=""
          />
        </div>
      )}
      <div
        className={`${
          movie && movie.backdrop_path && '-mt-[300px]'
        } max-w-[1300px] items-center md:items-start mx-auto flex-col md:flex-row flex gap-14 px-5 pb-[100px]`}
      >
        <div className="max-w-[400px] min-w-[250px] rounded-md overflow-hidden opacity-90  p-3">
          {movie && movie.poster_path ? (
            <img
              className="rounded-xl block shadow-lg shadow-white"
              src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
              alt=""
            />
          ) : (
            <img
              className="rounded-xl block shadow-lg shadow-white"
              src={
                'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'
              }
              alt={''}
            />
          )}
        </div>
        <div className="z-[1] flex flex-col gap-[50px] text-center md:text-start">
          <div className="">
            <h2 className=" text-3xl font-extrabold md:text-6xl mb-5">
              {movie ? movie.original_title : ''}
            </h2>
            <p className="font-semibold mb-2">{movie ? movie.tagline : ''}</p>
            <div className="md:justify-start justify-center flex gap-5">
              <span className="flex  items-center leading-none gap-1">
                {movie ? movie.vote_average.toFixed(1) : ''}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </span>
              <span>
                {movie ? movie.vote_count : ' '}
                {'(votes)'}
              </span>
            </div>
            <span className="mt-2 block">{movie ? movie.runtime : ''} mins</span>
            <div className="mt-2">Release date : {movie ? movie.release_date : ''}</div>
            <ul className="flex gap-5 mt-2 md:justify-start justify-center">
              {movie
                ? movie.genres.map((item) => {
                    return (
                      <li className="border rounded-full p-2" key={item.id}>
                        {item.name}
                      </li>
                    );
                  })
                : ''}
            </ul>
          </div>
          <div className="w-3/4 m-auto md:w-full md:m-0">
            <h4 className="text-2xl mb-3">Synopsis</h4>
            <p>{movie ? movie.overview : ''}</p>
          </div>
          <div>
            <h4 className="text-2xl mb-3"> Companies</h4>
            {movie
              ? movie.production_companies.map((el) => {
                  return (
                    <li key={el.id} className="list-none">
                      {el.name}
                    </li>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
      {topCast.length > 0 && (
        <div className="max-w-[1300px] m-auto">
          <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">Top Cast</h2>
          <TopCast actors={topCast} />
        </div>
      )}
      {videoId.length > 0 && (
        <div className="max-w-[1300px] m-auto">
          <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">Trailers</h2>
          <VideosSlider url={videoId} />
        </div>
      )}
      {similarMovies.length > 0 && (
        <div className='className="h-[500px] max-w-[1300px] m-auto mt-20'>
          <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">Similar</h2>
          <SimilarMoviesSlider similarMovies={similarMovies} />
        </div>
      )}
      {similarMovies.length > 0 && (
        <div className="h-[500px] max-w-[1300px] m-auto mt-20">
          <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">
            Recommendations
          </h2>
          <SimilarMoviesSlider similarMovies={recommendations} />
        </div>
      )}
      {reviews.map((review, id) => {
        return (
          <div
            key={review.id}
            className="relative max-w-[1000px] m-auto border-b flex flex-col p-4 gap-5"
          >
            <div className="flex gap-4">
              {review.author_details.avatar_path ? (
                <img
                  className="w-16 h-16 rounded-full"
                  src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                  alt={review.author}
                />
              ) : (
                <div className="border rounded-full flex items-center justify-center p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              )}

              <div className="">
                <h4>{review.author}</h4>
                <span className="mr-4">{review.created_at.slice(0, 10)}</span>
                <span>{review.created_at.slice(11, 19)}</span>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
                ${activeComment === review.id ? 'h-full' : 'h-[24px]'}`}
            >
              {review.content}
            </div>
            <button
              onClick={() => handleComment(review.id)}
              className="font-semibold text-3xl absolute top-5 right-5 "
            >
              {activeComment === review.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MovieDetail;
