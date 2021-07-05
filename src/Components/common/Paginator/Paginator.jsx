import React, {useState} from 'react'
import s from './Paginator.module.css'

let Paginator = ({totalUsersCount,pageSize,currentPage,onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        {
            pages.push(i)
        }
        if (i > 10) {
            {
                pages.push(pagesCount)
            }
            break
        }
    }
    return <div>
        {pages.map(p => {
            return <span className={currentPage === p && s.activePage}
                         onClick={(e) => {
                             onPageChanged(p)
                         }}
            >{p}</span>
        })}

    </div>
}
    export default Paginator