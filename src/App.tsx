import stylewind from './lib/stylewind';

const sc = {
  Container: stylewind.div(['flex', 'flex-col', 'rounded-sm', 'bg-red-500']),
  Item: stylewind.div(['p-2', 'bg-blue-200', 'p-5']),
};

function App() {
  return (
    <sc.Container>
      <div className="flex">Item 1</div>
      <div>Item 2</div>
      <sc.Item>Item 3</sc.Item>
    </sc.Container>
  );
}

export default App;
