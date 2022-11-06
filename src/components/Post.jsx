import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { ACTION_TYPES } from '../actions/postActionTypes';
import { INITIAL_STATE, postReducer } from '../reducers/postReducer';

const url = 'https://jsonplaceholder.typicode.com/posts/1';

const Post = () => {
   const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
   const { loading, post, error } = state;

   useEffect(() => {
      const fetchPost = async () => {
         dispatch({ type: ACTION_TYPES.FETCH_START });
         try {
            const res = await fetch(url);
            const data = await res.json();
            dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
         } catch (error) {
            console.log(error);
            dispatch({ type: ACTION_TYPES.FETCH_ERROR });
         }
      };

      fetchPost();
   }, []);

   return (
      <div>
         {loading && <h1>Loading...</h1>}
         <h2>Title: {post?.title}</h2>
         <p>{post?.body}</p>
         {error ? <h1>Something went wrong</h1> : ''}
      </div>
   );
};

export default Post;
// 9.10
