import {test,expect} from '@playwright/test';
test('homepage serves search metadata and profile data without client JavaScript',async({request})=>{
 const response=await request.get('/');expect(response.ok()).toBeTruthy();const html=await response.text();
 expect(html).toContain('<title>Shivam Yewle | AI Full Stack Developer in Pune | spyy</title>');
 const canonical=html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);expect(canonical).not.toBeNull();expect(new URL(canonical![1]).href).toBe('https://spyy.xyz/');
 const ogUrl=html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]+)"/);expect(ogUrl).not.toBeNull();expect(new URL(ogUrl![1]).href).toBe('https://spyy.xyz/');
 expect(html).toContain('property="og:site_name" content="spyy — Shivam Yewle"');
 expect(html).toMatch(/name="robots" content="index, follow"/);
 expect(html).not.toContain('http://localhost:3000');
 const script=html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);expect(script).not.toBeNull();
 const data=JSON.parse(script![1]);const person=data['@graph'].find((item:Record<string,unknown>)=>item['@type']==='Person');
 expect(person.jobTitle).toBe('AI Full Stack Developer');expect(person.sameAs).toContain('https://github.com/Spy-345');
 expect(data['@graph'].find((item:Record<string,unknown>)=>item['@type']==='ProfilePage').mainEntity['@id']).toBe(person['@id']);
});
test('crawl endpoints expose only canonical page URLs',async({request})=>{
 const robots=await request.get('/robots.txt');expect(robots.ok()).toBeTruthy();expect(await robots.text()).toContain('Sitemap: https://spyy.xyz/sitemap.xml');
 const sitemap=await request.get('/sitemap.xml');expect(sitemap.ok()).toBeTruthy();const xml=await sitemap.text();expect(xml).toContain('<loc>https://spyy.xyz/</loc>');expect(xml).not.toContain('#work');
 const image=await request.get('/opengraph-image');expect(image.ok()).toBeTruthy();expect(image.headers()['content-type']).toContain('image/png');
});
