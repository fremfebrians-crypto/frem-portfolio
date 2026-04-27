import sanitizeHtml from 'sanitize-html';

export function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      'h1','h2','h3','h4','h5','h6',
      'p','a','ul','ol','li','strong','em','blockquote','code','pre',
      'table','thead','tbody','tr','th','td','img','hr','br','div','span'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      '*': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
    disallowedTagsMode: 'discard'
  });
}
