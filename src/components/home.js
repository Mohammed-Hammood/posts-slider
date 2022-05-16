import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "./get-posts";
import '../styles/home.scss';
import SVG from "./svg";
import {
    SEARCH_VALUE, SEARCHED_POSTS, SORT_BY_DISCRIPTION, SORT_BY_TITLE, SORT_BY_ID,
    TOTAL_PAGES, TOTAL_SORTED_POSTS, SORTED_POSTS, CURRENT_SORT
} from '../redux/actions';

function Home() {
  const {posts, loading} = useFetch();
  const {id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = parseInt(id);
  const searchedPosts = useSelector(state => state.searchedPosts);
  const searchValue = useSelector(state => state.searchValue);
  const max  = currentPage * 10;
  const min = (currentPage * 10) - 10;
  const currentSort = useSelector(state => state.currentSort);
  const totalPages = useSelector(state => state.totalPages);
  const sortedPosts = useSelector(state => state.sortedPosts);
  const sortById = useSelector(state => state.sortById);
  const sortByDescription = useSelector(state => state.sortByDescription);
  const sortByTitle = useSelector(state => state.sortByTitle);
    useEffect(()=> {
      const sortPosts = ()=> {
            let postsArr = [];
            ((searchValue.length > 0)?searchedPosts:posts).forEach((value, index) => {if(index >= min && index < max){
                if(sortById === "-id" && currentSort === "id"){postsArr.push(value);}
                else if(sortById==='id' && currentSort === 'id'){postsArr.unshift(value);}
                else {postsArr.push(value);}
              }
            });
            if(searchValue.length > 0){
                const totalPages = Math.ceil(searchedPosts.length/10);
                dispatch(TOTAL_PAGES(totalPages || 1));
                dispatch(TOTAL_SORTED_POSTS(searchedPosts.length));
                if(currentPage > totalPages){navigate("/1");}
            }else {  
              dispatch(TOTAL_PAGES(Math.ceil(posts.length/10)));  
              dispatch(TOTAL_SORTED_POSTS(posts.length));
            }
            function Sort(direction){
                for(let i =0; i < postsArr.length; i++){
                    let index = i;
                    for(let j=i; j < postsArr.length; j++){
                        if(postsArr[j].title < postsArr[index].title && direction === '-t'){index = j;}
                        else if(postsArr[j].title > postsArr[index].title && direction === 't'){index = j;}
                        else if(postsArr[j].body < postsArr[index].body && direction === '-d'){index = j;}
                        else if(postsArr[j].body > postsArr[index].body && direction === 'd'){index = j;}
                    }
                    let temp = postsArr[i];
                    postsArr[i] = postsArr[index];
                    postsArr[index] = temp; 
                }
            }
            if(currentSort==='t'){Sort(sortByTitle);}
            else if(currentSort==='d'){Sort(sortByDescription);}
            if(postsArr.length < 10){
                const emptyPost = {
                    id:null,
                    userId:null,
                    title:null,
                    body:null
                }
                while(postsArr.length < 10){
                    postsArr.push(emptyPost);
                }
            }
            dispatch(SORTED_POSTS(postsArr));
        }
        sortPosts();
        }, [dispatch, navigate, searchedPosts, currentPage, posts, loading, sortById, sortByTitle, sortByDescription, currentSort, max, min, searchValue])
  const pagginationPagesArr = ()=> {
    //returns array of pages numbers [1,2,4,..]
      let pagesArr = [];
      for(let i=0; i < totalPages; i++)
        pagesArr.push(i+1);
    return pagesArr;
  }
  const handlePageSwitch = (direction)=> {
    if(direction==='next'){
      if(currentPage >= totalPages){
        navigate(`/${totalPages}`);
      }
      else{
        navigate(`/${currentPage + 1}`);
      }
    }else if(direction==='previous'){
      if(currentPage <= 1){
        navigate(`/1`);
      }
      else{
        navigate(`/${currentPage - 1}`);
      }
    }else {
      navigate(`/${direction}`);
    }

  }
  const setSortType = (orderType)=> {
    //t  = title, d = body/description
    if(orderType==='id'){
      if(sortById==='id'){dispatch(SORT_BY_ID('-id'));dispatch(CURRENT_SORT('id'));}
      else {dispatch(SORT_BY_ID('id'));dispatch(CURRENT_SORT('id'));}
    }else if(orderType==='t'){
      if(sortByTitle ==='t'){dispatch(SORT_BY_TITLE('-t'));dispatch(CURRENT_SORT('t'));}
      else {dispatch(SORT_BY_TITLE('t'));dispatch(CURRENT_SORT('t'));}
    }else if(orderType==='d'){
      if(sortByDescription==='d'){dispatch(SORT_BY_DISCRIPTION('-d'));dispatch(CURRENT_SORT('d'));}
      else {dispatch(SORT_BY_DISCRIPTION('d'));dispatch(CURRENT_SORT('d'));}
    }
  }
 
const handleSearch = (e)=> {
  if(e.target.value.trim().length > 0){
    const q = e.target.value.trim();
    let Arr = [];
      for(let i=0; i< posts.length; i++){
        if(posts[i].title.includes(q) || posts[i].body.includes(q)){
          Arr.push(posts[i]);
        }
      }
      dispatch(SEARCHED_POSTS(Arr));
      dispatch(SEARCH_VALUE(e.target.value));
    }else {
      dispatch(SEARCH_VALUE(""));
      dispatch(SEARCHED_POSTS([]));
  }
}
  return (
    <div className="Home">
      {loading?<div className='loader'><span></span></div>:null}
        <div className="container">
          <div className="main-container">
          {(posts.length > 0)?<>
            <div className='search-container'>
                <div className="input-container">
                  <input type='search' placeholder="Поиск" name="search" id='input-search' onInput={(e)=> {handleSearch(e)}} />
                </div>
                <div onClick={()=> {document.getElementById('input-search').focus();}}>
                    <SVG name='search' />
                </div>
            </div>
            <div className='posts-container'>
              <div className="header">
                  <div className="id" title="Sort by id">
                    <span className={(currentSort==='id')?"active":null}>ID</span>
                    <button type='button' onClick={()=>setSortType('id')}>
                      {sortById === '-id' ? <SVG name='angle-down' />:<SVG name='angle-up' />}
                    </button>
                  </div>
                  <div className="title" title="Sort by title">
                    <span className={(currentSort==='t')?"active":null}>Заголовок</span>
                    <button type='button' onClick={()=>setSortType('t')}>
                      {sortByTitle ==='-t'?<SVG name='angle-down' />:<SVG name='angle-up' />}
                    </button>
                  </div>
                  <div className="description" title="Sort by description">
                    <span className={(currentSort==='d')?"active":null}>Описание</span>
                    <button type="button" onClick={()=>{setSortType('d')}}>
                      {sortByDescription ==='-d'?<SVG name='angle-down' />:<SVG name='angle-up' />}
                    </button>
                  </div>
              </div>
              <div className="posts">
                    {sortedPosts.map((post, index)=> {return (<div className="post" key={index}>
                      <div className='id'>{post.id}</div>
                      <div className='title'>{post.title}</div>
                      <div className='description'>{post.body }</div>
                    </div>)
                    })}
              </div>
            </div>
            <div className="paggination-container">
                    <div>
                      <button onClick={()=> handlePageSwitch('previous')} type='button'>Назад</button>
                    </div>
                    <div className="pages">
                      {pagginationPagesArr().map((item, index)=> {return (<button onClick={()=> handlePageSwitch(item)} className={(currentPage===item)?"paggination-numbers active":"paggination-numbers"} key={index}> {item} </button>)})}
                    </div>
                    <div>
                      <button type='button' onClick={()=> handlePageSwitch('next')}>Далее</button>
                    </div>
            </div>
          </>:null}
          </div>
      </div>
    </div>
  );
}

export default Home;
