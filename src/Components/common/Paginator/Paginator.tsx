import React, {useState} from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'
import { PropsType } from '../../../types/types'


const Paginator: React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber  * portionSize
    return <div>
        { portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1)}
        }> Previous </button>}
        {pages.filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map(p => {
            return <span key={p} className={cn({[s.activePage]: currentPage === p}, s.page)}
                         onClick={(e) => {
                             onPageChanged(p)
                         }}
            >{p}</span>
        })}
        { portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)} }>NEXT</button>}
    </div>
}

export default Paginator