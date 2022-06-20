import { marked } from 'marked';

type Result = {
  total: number;
  remaining: number;
}
 
export = function(body: string) {
  let result: Result = {
    total: 0,
    remaining: 0,
  }
  if (body === null) {
    return result
  }

  let regex: RegExp = new RegExp('\<\!\-\-(?:.|\n|\r)*?-->', 'g');

  let tokens: marked.TokensList = marked.lexer(body, { gfm: true });
  let allTokens = tokens.flatMap(function mapper(token: marked.Token): any {
    let t = token as marked.Tokens.ListItem 
    let l = token as marked.Tokens.List
    if (t.tokens && t.tokens.length > 1) {
      return t.tokens.flatMap(mapper);
    }
    return l.items && l.items.length ? l.items.flatMap(mapper) : [l];
  });

  let items: marked.Tokens.ListItem[] = allTokens.filter(token => token.type === 'list_item');
  let optional = items.filter(item => item.text.match(regex));

  result = {
    total: items.filter(item => item.checked !== undefined).length - optional.length,
    remaining: items.filter(item => item.checked === false).length - optional.length
  };

  return result
};
