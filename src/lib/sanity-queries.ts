import groq from "groq";

const POST_FIELDS = groq`
  _id,
  title,
  excerpt,
  slug,
  publishedAt,
  readTime,
  image,
  author->{
    name,
    avatar
  },
  postCategories[]->{
    name,
    description
  }
`;

const PRODUCT_FIELDS = groq`
  images,
  productCategory->{
    name,
    description
  },
  name,
  description,
  price,
  version,
  colors,
  productSize->{
    sizeGuide,
    sizes
  },
  slug
`;

export const POSTS_QUERY = groq`
  *[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{
    ${POST_FIELDS}
  }
`;

export const POST_QUERY = groq`
  *[
    _type == "post"
    && slug.current == $slug
  ][0]{
    ${POST_FIELDS},
    content
  }
`;

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[
    _type == "post"
    && defined(slug.current)
    && $categoryId in postCategories[]._ref
  ]|order(publishedAt desc){
    ${POST_FIELDS}
  }
`;

export const COMPACT_POST_QUERY = groq`
  *[
    _type == "compactPost"] {
      posts[]->{
        ${POST_FIELDS}
      }
    }`;

export const RECOMMEND_POST_QUERY = groq`
  *[
    _type == "recommendPost"] {
      posts[]->{
        ${POST_FIELDS}
      }
    }`;

export const POST_CAROUSEL_QUERY = groq` 
    *[
    _type == "postCarousel"]{
        posts[]->{
            ${POST_FIELDS}
        }
    }
`;

export const SEARCH_QUERY = groq`
  *[
    _type == "post"
    && defined(slug.current)
    && (title match "*" + $searchString + "*" 
    || excerpt match "*" + $searchString + "*"
    || content match "*" + $searchString + "*"
    || author->name match "*" + $searchString + "*"
    || postCategories[]->name match "*" + $searchString + "*")
  ]|order(publishedAt desc) {
      ${POST_FIELDS}
    }
`;

export const POST_CATEGORY_QUERY = groq`
  *[
    _type == "postCategory"
  ]|order(name desc){
    name,
    description
  }
`;

export const BLOG_OWNER_INFO_QUERY = groq`
  *[
    _type == "blogOwnerInfo"
][0]{
    logo,
    avatar,
    name,
    email,
    address,
    phone,
    introduction,
    bio,
  }
`;

export const SHOP_INFO_QUERY = groq`
  *[
    _type == "shopInfo"
][0]{
    logo,
    logoDark,
    name,
    email,
    address,
    phone,
    introduction,
  }
`;

export const SOCIAL_MEDIA_QUERY = groq`
  *[
    _type == "socialMedia"
  ]|order(name desc){
    platform,
    url,
    icon
  }
`;

export const PRODUCT_CATEGORY_QUERY = groq`
  *[
    _type == "productCategory"
  ]|order(name desc){
    name,
    description
  }
`;

export const PRODUCTS_QUERY = groq`
  *[
    _type == "product"
  ]|order(_createdAt desc){
    ${PRODUCT_FIELDS}
  }
`;

export const PRODUCT_QUERY = groq`
  *[
    _type == "product"
    && slug == $slug
  ][0]{
    ${PRODUCT_FIELDS}
  }
`;
