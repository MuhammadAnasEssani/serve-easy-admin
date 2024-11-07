import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {IoCloseOutline, IoFastFoodSharp, IoSearchOutline} from 'react-icons/io5'
import {GiChickenLeg} from 'react-icons/gi'
import {MdFastfood} from 'react-icons/md'
import {BsArrowReturnLeft} from 'react-icons/bs'
import '../../../assets/css/components/searchfield.scss'

export default function SearchField() {
  const [searchResult, setsearchResult] = useState<boolean>(false)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' ? setsearchResult(true) : setsearchResult(false)
  }
  return (
    <>
      <div className="search-field">
        <div className="search-icon">
          <IoSearchOutline />
        </div>
        <Form.Group className="form-group">
          <Form.Control type="text" placeholder="Search ..." onChange={handleSearch} />
        </Form.Group>
        <div className="cancel">
          <ul>
            <li>
              <IoCloseOutline />
            </li>
            <li>Cancel</li>
          </ul>
        </div>
      </div>
      {searchResult && (
        <div className="search-result-section">
          <div className="search-categories">
            <h6>Zinger Burgers</h6>
          </div>
          <div className="search-values">
            <div className="search-result-icon">
              <MdFastfood />
            </div>
            <div className="search-content">
              <h5>
                <span className="search-text">Chicken</span> Zinger Burger
              </h5>
              <p>Burger {'>'} Crispy Burgers</p>
            </div>
            <div className="enter-icon">
              <BsArrowReturnLeft />
            </div>
          </div>
          <div className="search-values">
            <div className="search-result-icon">
              <IoFastFoodSharp />
            </div>
            <div className="search-content">
              <h5>
                <span className="search-text">Chicken</span> Burger
              </h5>
              <p>Burger {'>'} Burgers</p>
            </div>
            <div className="enter-icon">
              <BsArrowReturnLeft />
            </div>
          </div>
          <div className="search-values">
            <div className="search-result-icon">
              <MdFastfood />
            </div>
            <div className="search-content">
              <h5>
                Special <span className="search-text">Chicken</span> Burger
              </h5>
              <p>Burger {'>'} Special Burgers</p>
            </div>
            <div className="enter-icon">
              <BsArrowReturnLeft />
            </div>
          </div>
          <div className="search-categories">
            <h6>Fast Foods</h6>
          </div>
          <div className="search-values">
            <div className="search-result-icon">
              <GiChickenLeg />
            </div>
            <div className="search-content">
              <h5>
                <span className="search-text">Chicken</span> Broast
              </h5>
              <p>Burger {'>'} Broast</p>
            </div>
            <div className="enter-icon">
              <BsArrowReturnLeft />
            </div>
          </div>
          <div className="search-values">
            <div className="search-result-icon">
              <MdFastfood />
            </div>
            <div className="search-content">
              <h5>
                Zinger <span className="search-text">Chicken</span>Burger
              </h5>
              <p>Burger {'>'} Crispy Burgers</p>
            </div>
            <div className="enter-icon">
              <BsArrowReturnLeft />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
