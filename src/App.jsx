import { useState } from 'react';               // если ещё нет
import KidsRewardApp from './kids_reward_app';  // ← без .jsx !

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#111',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <KidsRewardApp />    {/* ← здесь вызывается твой компонент */}
    </div>
  );
}

export default App;
