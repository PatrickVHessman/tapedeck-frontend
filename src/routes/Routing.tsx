import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Fusions from '@/pages/Fusions/Fusions';
import Monsters from '@/pages/Monsters/Monsters'
import Monster from '@/pages/Monsters/Monster';
import Moves from '@/pages/Moves/Moves';
import Move from '@/pages/Moves/Move';
import Acknowledgements from '@/pages/Acknowledgements/Acknowledgements';
import Statuses from '@/pages/Statuses/Statuses';
import Status from '@/pages/Statuses/Status';
import ElementalTypes from '@/pages/ElementalTypes/ElementalTypes';
import ElementalType from '@/pages/ElementalTypes/ElementalType';

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/monsters/:monsterKey" element={<Monster />} />
          <Route path="/fusions" element={<Fusions />} />
          <Route path="/moves" element={<Moves />} />
          <Route path="/moves/:moveKey" element={<Move />} />
          <Route path="/acknowledgements" element={<Acknowledgements />} />
          <Route path="/statuses" element={<Statuses />} />
          <Route path="/statuses/:statusKey" element={<Status />} />
          <Route path="/elementalTypes" element={<ElementalTypes />} />
          <Route path="/elementalTypes/:elementKey" element={<ElementalType />} />
    </Routes>
  );
};

export default Routing;
