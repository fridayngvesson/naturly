import React from 'react'
import "./CardArticles.css";

const CardArticles = () => {
  return (
    <>
    <div className='card-articles-wrapper'>
        <div>
            <img className='img-article' src="assets/article-hund.jpg" alt="Hund med ägare på berg" />
            <p className='article-p'>Fjällvandra med hund</p>
        </div>
        <div>
            <img className='img-article' src="assets/article-sheep.jpg" alt="" />
            <p className='article-p'>Vandringsleder</p>
        
        </div>
        <div>
            <img className='img-article' src="assets/article-resa.jpg" alt="" />
            <p className='article-p'>Hur du planerar din resa</p>
        </div>



    </div>
    </>
  )
}

export default CardArticles