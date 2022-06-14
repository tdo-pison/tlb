import { marked } from 'marked';
 
export = function(body: string) {
  if (body === null) {
    return { total: 0, remaining: 0 };
  }
  
  let tokens: marked.TokensList = marked.lexer(body, { gfm: true });
  console.log(tokens)
  let allTokens = tokens.flatMap(function mapper(token: marked.Token): any {
    let t = token as marked.Tokens.ListItem 
    let l = token as marked.Tokens.List
    if (t.tokens && t.tokens.length > 1) {
      return t.tokens.flatMap(mapper);
    }
    return l.items && l.items.length ? l.items.flatMap(mapper) : [l];
  });
  
  let items: marked.Tokens.ListItem[] = allTokens.filter(token => token.type === 'list_item');
  return {
    total: items.filter(item => item.checked !== undefined).length,
    remaining: items.filter(item => item.checked === false).length
  };
};
