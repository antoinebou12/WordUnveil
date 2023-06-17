import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

import './WordOfTheDayPage.css';

import GameLogic from 'src/components/GameComponents/GameLogic/GameLogic';
import Rules from 'src/components/GameComponents/Rules/Rules';
import Keyboard from 'src/components/GameComponents/Keyboard/Keyboard';
import Header from 'src/components/GameComponents/Header/Header';

const WordOfTheDayPage = ({ lang = 'en' }) => {
  switch (lang) {
    case 'fr':
      return (
        <div className="MotduJour">
          <MetaTags title="Mot du Jour !" description="Mot du Jour !" />
          <Header title='Mot du Jour !' />
          <GameLogic rows={6} cols={5} language="fr" />
          <Rules notInWord="Pas dans le mot" badPosition="Mauvaise position" goodPosition="Parfait!" />
          <Keyboard language="fr" />
        </div>
      )
    case 'es':
      return (
        <div className="PalabraDelDia">
          <MetaTags title="Palabra Del Dia !" description="Palabra Del Dia !" />
          <Header title='Palabra Del Dia !' />
          <GameLogic rows={6} cols={5} language="es" />
          <Rules notInWord="no en la palabra" badPosition="Mala Posición" goodPosition="Perfecto !" />
          <Keyboard language="es" />
        </div>
      )
    case 'en':
    default:
      return (
        <div className="WordOfTheDay">
          <MetaTags title="Word of the Day !" description="Word of the Day !" />
          <Header title='Word of the Day !' />
          <GameLogic rows={6} cols={5} language="en" />
          <Rules notInWord="Not in the word" badPosition="Bad Position" goodPosition="Perfect!" />
          <Keyboard language="en" />
        </div>
      )
  }
}

export default WordOfTheDayPage;
