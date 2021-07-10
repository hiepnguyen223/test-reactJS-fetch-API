import { useEffect, useState } from 'react';
import './App.css';
import PostList from './features/PostList'
import Pagination from './features/Pagination'
import queryString from 'query-string'
function App() {

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _limit: 0,
    _page: 0,
    _totalRow: 0
  })
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  })

  useEffect ( () => {

    async function fetchPostList () {
      const paramsString = queryString.stringify(filters);
      const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setPostList(responseJSON.data);
      setPagination(responseJSON.pagination);
    }

    fetchPostList();
  }, [filters])

  const handlePageChange = (page) => {
    const temp = {
      ...filters,
      _page: page
    }
    setFilters(temp);
  }

  return (
    <div className="App">
      <PostList posts = {postList}/>
      <Pagination pagination = {pagination} onPageChange = {handlePageChange}/>
    </div>
  );
}

export default App;
