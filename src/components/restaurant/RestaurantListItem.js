import { CATEGORY } from '../../constants';
import { $, dispatchCustomEvent } from '../../utils/dom';

customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
    constructor() {
      super();
      this.render();
      this.bindEvent();
    }

    connectedCallback() {
      this.addEventListener('click', () => this.handleDetailClick());
    }

    render() {
      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');
      const favorite = this.getAttribute('favorite');

      this.innerHTML = /* html */ `
        <li class="restaurant">
          <div class="restaurant__category">
            <img src="./category-${
              CATEGORY[category]
            }.png" alt="${category}" class="category-icon" />
          </div>
          <div class="restaurant__info">
            <div>
              <div>
                <h3 class="restaurant__name text-subtitle">${restaurantName}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              </div>
              <button type="button" class="favorite__button" aria-label="${
                favorite === 'true' ? '삭제' : '추가'
              }">
                <img src="./favorite-icon-${
                  favorite === 'true' ? 'filled' : 'lined'
                }.png" alt="즐겨찾기 ${
        favorite === 'true' ? '삭제' : '추가'
      }" class="favorite-icon">
              </button>
            </div>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>
        `;
    }

    bindEvent() {
      this.querySelector('.favorite__button').addEventListener('click', (e) =>
        this.handleFavoriteClick(e)
      );
    }

    handleFavoriteClick(e) {
      e.stopPropagation();
      this.setAttribute('favorite', this.getAttribute('favorite') === 'true' ? 'false' : 'true');
      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'changeRestaurantFavorite',
        data: this.getAttribute('restaurantID'),
      });
      this.render();
      this.bindEvent();
    }

    handleDetailClick() {
      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'clickRestaurantDetail',
        data: this.getAttribute('restaurantID'),
      });
    }
  }
);
