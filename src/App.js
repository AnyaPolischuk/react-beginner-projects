import React, { useEffect, useState } from 'react';
import { Collection } from './Collection';
import './index.scss';

const categories = [
  {name: "Все"},
  {name: "Море"},
  {name: "Горы"},
  {name: "Архитектура"},
  {name: "Города"}
]

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(`https://65367ee1bb226bb85dd23784.mockapi.io/photo_collection?page=${page}&limit=2&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => <li onClick={() => setCategoryId(index)} className={categoryId === index ? "active" : ""} key={obj.name}>{obj.name}</li>)}
        </ul>
        <input value={searchValue} onChange={event => setSearchValue(event.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка</h2>
        ) : (
          collections
        .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos}/>))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, index) => <li onClick={() => setPage(index + 1)} className={page === index + 1 ? "active" : ""}>{index + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
