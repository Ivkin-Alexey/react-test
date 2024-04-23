import React, {useState, useEffect, useRef, EffectCallback} from 'react';
import "./Scroll.css";
import { fetchData } from '../../services/api';
import { IUser } from '../../types/types';
import { MIN_SCROLL_END_RATIO, RENDERED_USERS_LENGTH } from '../../assets/constants';
import useMetrics from '../../useMetrics';
import ScrollItem from "../ScrollItem/ScroolItem";

const Scroll: React.FC = () => {

    const [userList, setUserList] = useState<IUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const listWrapperRef = useRef(null);

    const {clientHeight, scrollHeight, scrollTop, scrollBottom} = useMetrics(listWrapperRef);

    async function handleScroll() {
        setIsLoading(() => true);
        let start;
        if(page === 1) start = 1;
        else start = page * RENDERED_USERS_LENGTH + 1;
        const end = start + RENDERED_USERS_LENGTH;
        const list = await fetchData(start, end);
        setUserList(prev => [...prev, ...list]);
        setIsLoading(() => false);
    }

    useEffect(() => {

    handleScroll().catch(e => console.log(e));

    }, []);



    useEffect(() => {
        if(scrollBottom < clientHeight * MIN_SCROLL_END_RATIO && !isLoading) {
            setIsLoading(true);
            setPage(prev => prev + 1);
            handleScroll().catch(e => console.log(e))}
        // } else if (scrollHeight < clientHeight * MIN_SCROLL_END_RATIO) {
        //     setPage(prev => prev - 1);
        //     handleScroll().catch(e => console.log(e))
        // }
        console.log(page);
    }, [scrollTop]);

    useEffect(() => {
        console.log("scrolled");
    }, [scrollTop]);

    return (
        <div ref={listWrapperRef} className="scroll">
            {userList.map((item, index) => (
                <ScrollItem key={index} title={item.name}/>
            ))}
            {isLoading && <h4>Loading...</h4>}
        </div>
    );
};

export default Scroll;
