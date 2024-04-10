import React, { useState, useEffect, useRef } from 'react';
import { fetchData } from '../assets/services/api';
import { IUser } from '../types/types';
import { MIN_SCROLL_END_RATIO, RENDERED_USERS_LENGTH } from '../assets/constants';
import useMetrics from '../useMetrics';

const Scroll: React.FC = () => {

    const [userList, setUserList] = useState<IUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const listWrapperRef = useRef(null);

    const {clientHeight, scrollHeight, scrollBottom, scrollTop} = useMetrics(listWrapperRef);

    useEffect(async () => {

      async function handleScroll() {
        setIsLoading(true);
        const start = page * RENDERED_USERS_LENGTH + 1;
        const end = start + RENDERED_USERS_LENGTH - 1
        const list = await fetchData(start, end);
        setUserList(() => list);
      }

      if(scrollBottom < clientHeight * MIN_SCROLL_END_RATIO) {
        setPage(prev => prev++);
        await handleScroll()
      } else if (elTop <= scrollY && page > 1) {
        setPage(prev => prev--);
        await handleScroll()
      }

      setIsLoading(false);
    
    }, [scrollTop]);

    return (
      <div ref={listWrapperRef}>
        {userList.map((item, index) => (
          <div key={index}>{item?.name}</div>
        ))}
        {isLoading && <h4>Loading...</h4>}
      </div>
    );
  };

export default Scroll;
