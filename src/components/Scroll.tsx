import React, { useState, useEffect } from 'react';
import { fetchData } from '../assets/services/api';
import { IUser } from '../types/types';
import { RENDERED_USERS_LENGTH } from '../assets/constants';

const Scroll: React.FC = () => {

    const [fechedUsers, setFechedUsers] = useState<IUser[]>([]);
    const [userList, setUserList] = useState<IUser[]>([]);
    const [page, setPage] = useState<[number, number]>([1, 1]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(async () => {

      if(page[0] >= page[1] - 1) {
        setLoading(true);
        const list = await fetchData();
        setFechedUsers(() => list);
        setPage(prev => [prev[0], list.length / RENDERED_USERS_LENGTH]);
      }

      setLoading(false);
    
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [page]);
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        setPage(prev => [prev[0] + 1, prev[1]]);
      }
    };

    return (
      <div>
        {userList.map((item, index) => (
          <div key={index}>{item?.name}</div>
        ))}
        {loading && <h4>Loading...</h4>}
      </div>
    );
  };

export default Scroll;
