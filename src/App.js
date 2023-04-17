import './App.css';
import { useState } from 'react';
function Header(props){
  return <header> 
  <h1><a href='/' onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}
function Nav(props){
  const lis = []
for(let i = 0; i<props.topics.length; i++){
  let t = props.topics[i];
  lis.push(<li key={t.id}>
    <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id))//형 변환
    }}>{t.title}</a></li>)
}
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}
function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title,body); 
    }}>
      <p><input type="text" name="title" placeholder='title'/></p> 
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type='submit' value="Create"></input></p>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'장르',body:'1.발라드 2.힙합 3.댄스'},
    {id:2, title:'기획사',body:'1.WM.ENT 2.RBW 3.하이브'},
    {id:3, title:'아티스트',body:'1.오마이걸 2.마마무 3.BTS'}
  ])
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="음악이 필요한 순간🎵"></Article>
  } 
  else if(mode === 'READ'){
    let title, body = null;
    for(let i = 0; i <topics.length; i++){
      console.log(topics[i].id, id)
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('READ')
      setId(nextId)
      setNextId(nextId+1)
    }}>
    </Create>
  }
    return (
   <div> 
    {/* 컴포넌트 */}
    <Header title="Melon" onChangeMode={()=>{
      setMode('WELCOME')
    }}></Header>
    <Nav topics={topics} onChangeMode={(_id)=>{
      setMode('READ')
      setId(_id)
    }}></Nav>
    {content}
    <li><a href="/create" onClick={event=>{
      event.preventDefault();
      setMode('CREATE')
    }}>Create</a></li>
    <li><a href="/update">Update</a></li>
   </div>
  );
}

export default App;
