import { createEvent, createEffect, createStore } from 'effector';

export const fetchBeersFx = createEffect(async () => {
  const response = await fetch('https://api.punkapi.com/v2/beers');
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
});

// export const $beersError = createStore(null).on(
//   fetchBeersFx.failData,
//   (_state, error) => error,
// );
export interface IBeers {
  id: number;
  description: string;
  abv: string;
  name: string;
  image_url: string;
}

export const $beers = createStore<IBeers[]>([]).on(
  fetchBeersFx.doneData,
  (state, beers) => beers,
);

export const $selectedBeer = createStore(null);
export const selectBeer = createEvent();
$selectedBeer.on(selectBeer, (state, beer) => beer);
