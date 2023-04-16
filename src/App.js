
import './App.css';
function Header(props){
  return <header> 
  <h1><a href='/'>{props.title}</a></h1>
</header>
}
function Nav(props){
  const lis = []
for(let i = 0; i<props.topics.length; i++){
  let t = props.topics[i];
  lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
}
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}
function Article(){
  return <article>
  <h2> 음악이 필요한 순간 멜론🎵</h2>
</article>
}
function App() {

  const topics =[
    {id:1, title:'장르',body:'장르'},
    {id:2, title:'기획사',body:'기획사'},
    {id:3, title:'앨범',body:'앨범'}
  ] 
    return (
   <div> 
    {/* 컴포넌트 */}
    <Header title="Melon"></Header>
    <Nav topics={topics}></Nav>
    <Article></Article>
   </div>
  );
}

export default App;
