import React, { useEffect } from 'react';
import { useStore, useList } from 'effector-react';
import {
  $beers,
  $selectedBeer,
  // $beersError,
  fetchBeersFx,
  selectBeer,
} from '../../context/test';
import { $auth, fetchAuthFx } from '@/context/auth';

const Loading = () => {
  const isLoading = useStore(fetchBeersFx.pending);
  return <>{isLoading && 'Loading...'}</>;
};

// const Error = () => {
//   const error = useStore($beersError);
//   return error && 'Whoops something went wrong';
// };

const ListItem = ({ beer }: any) => {
  return (
    <li key={beer.id}>
      <button
        className="Beer"
        onClick={() => {
          selectBeer(beer);
        }}
      >
        {beer.name}
      </button>
    </li>
  );
};

const List = () => {
  return (
    <ul className="BeerList">
      {useList($beers, (beer): any => (
        <ListItem key={beer.id} beer={beer} />
      ))}
    </ul>
  );
};

const Selected = () => {
  const selected: any = useStore($selectedBeer);
  return (
    selected && (
      <div className="Selected">
        <p>{selected.description}</p>
        <p>{selected.abv} abv</p>
        <img height="200" src={selected.image_url} alt={selected.name} />
      </div>
    )
  );
};

export default function EffectorList() {
  useEffect(() => {
    fetchBeersFx();
  }, []);

  return (
    <>
      <h2>Effector List</h2>
      <Loading />
      {/* <Error /> */}
      <section className="Columns">
        <List />
        <Selected />
      </section>
    </>
  );
}
