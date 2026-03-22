import { getPosts } from './lib/notion'                                                                 
import HomeComponent from './components/HomeComponent'  // the current page.tsx content                       
                                                                                                          
export default async function Home() {                                                                  
    const posts = await getPosts()                                                                        
    return <HomeComponent posts={posts} />                                                                   
}   