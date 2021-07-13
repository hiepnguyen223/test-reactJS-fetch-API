import { useEffect, useState } from 'react';
import './App.css';
import PostList from './features/PostList'
import Pagination from './features/Pagination'
import queryString from 'query-string'
import SearchForm from './features/SearchForm'
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
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setPostList(responseJSON.data);
        setPagination(responseJSON.pagination);
      } catch (error) {
        console.log('error: ' + error.message);
      }
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

  function handleSearchForm (value) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: value,
    })
  }

  return (
    <div className="App">
      <SearchForm onSubmit = {handleSearchForm}/>
      <PostList posts = {postList}/>
      <Pagination pagination = {pagination} onPageChange = {handlePageChange}/>
    </div>
  );
}

export default App;
