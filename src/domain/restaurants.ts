import { sampleRestaurants } from './sampleRestaurants';

import { getLocalStorage } from '../utils/localStorage';
import { RESTAURANTS_LOCAL_STORAGE_KEY } from '../constants';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Distance = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

interface Restaurants {
  list: Restaurant[];
  init(): void;
  add(restaurant: Restaurant): void;
  filterByCategory(category: Category | '전체', restaurants: Restaurant[]): Restaurant[];
  sortByName(restaurants: Restaurant[]): Restaurant[];
  sortByDistance(restaurants: Restaurant[]): Restaurant[];
  compareByName(a: Restaurant, b: Restaurant): number;
}

export const restaurants: Restaurants = {
  list: [],

  init() {
    this.list = getLocalStorage(RESTAURANTS_LOCAL_STORAGE_KEY) ?? sampleRestaurants;
  },

  add(restaurant) {
    this.list = [restaurant, ...this.list];
  },

  filterByCategory(category, restaurants) {
    const filteredRestaurants = restaurants.filter(
      (restaurant) => restaurant.category === category
    );

    return category === '전체' ? this.list : filteredRestaurants;
  },

  sortByName(restaurants) {
    return [...restaurants].sort(this.compareByName);
  },

  sortByDistance(restaurants) {
    return [...restaurants].sort((a: Restaurant, b: Restaurant) => {
      if (a.distance === b.distance) {
        // 같은 거리일 경우 이름 순으로 정렬
        return this.compareByName(a, b);
      }

      return a.distance - b.distance;
    });
  },

  compareByName(a: Restaurant, b: Restaurant) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  },
};
