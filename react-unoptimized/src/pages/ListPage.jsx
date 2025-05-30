
import React, { useEffect, useState } from 'react'
import data from '../data/items.json'
import './ListPage.css'

function ListPage() {
  const [items] = useState(data)
  const [selectedCategory, setSelectedCategory] = useState('Фрукти')
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [loadTime, setLoadTime] = useState(null)

  useEffect(() => {
    const start = performance.now()
    window.addEventListener('load', () => {
      const end = performance.now()
      setLoadTime((end - start).toFixed(2))
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id))
  }

  const filteredItems = items.filter(i => i.category === selectedCategory)

  return (
    <div className="container">
      <h2>Каталог товарів</h2>

      {loadTime && (
        <p style={{ fontWeight: 'bold', color: '#00aa55' }}>
          Сторінка завантажена за {loadTime} мс
        </p>
      )}

      <div className="tabs">
        {['Фрукти', 'Овочі', 'Солодощі'].map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? 'active' : ''}>
            {cat}
          </button>
        ))}
      </div>

      <div className="cart">
        <h3>Корзина ({cart.length})</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => removeFromCart(item.id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid">
        {filteredItems.map(item => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <button onClick={() => addToCart(item)}>Додати в корзину</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListPage
