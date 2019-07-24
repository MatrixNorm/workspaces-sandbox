;;;; Serene
;;; com.paren/serene
;;; https://github.com/paren-com/serene
;;; Generate clojure.spec with GraphQL and extend GraphQL with clojure.spec
;;;
;;; DO NOT EDIT THIS FILE!

(ns com.github.matrixnorm.serene-hello.specs (:require [clojure.core] [clojure.spec.alpha]))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Author
  (clojure.spec.alpha/keys
   :opt-un
   [:com.github.matrixnorm.serene-hello.specs.Author/books
    :com.github.matrixnorm.serene-hello.specs.Author/height_cm
    :com.github.matrixnorm.serene-hello.specs.Author/name
    :com.github.matrixnorm.serene-hello.specs.Author/__typename]))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Book
  (clojure.spec.alpha/keys
   :opt-un
   [:com.github.matrixnorm.serene-hello.specs.Book/ISBN
    :com.github.matrixnorm.serene-hello.specs.Book/authors
    :com.github.matrixnorm.serene-hello.specs.Book/title
    :com.github.matrixnorm.serene-hello.specs.Book/__typename]))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/String clojure.core/string?)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book.title/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query/getAuthors
  (clojure.spec.alpha/nilable
   (clojure.spec.alpha/coll-of
    :com.github.matrixnorm.serene-hello.specs/Author
    :kind
    clojure.core/sequential?)))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author.name/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author/__typename #{"Author"})

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author.__typename/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Boolean clojure.core/boolean?)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query.__typename/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book/__typename #{"Book"})

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book.__typename/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query/__typename #{"Query"})

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query/getBooks
  (clojure.spec.alpha/nilable
   (clojure.spec.alpha/coll-of
    :com.github.matrixnorm.serene-hello.specs/Book
    :kind
    clojure.core/sequential?)))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author.books/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Query
  (clojure.spec.alpha/keys
   :opt-un
   [:com.github.matrixnorm.serene-hello.specs.Query/getAuthors
    :com.github.matrixnorm.serene-hello.specs.Query/getBooks
    :com.github.matrixnorm.serene-hello.specs.Query/__typename]))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book/authors
  (clojure.spec.alpha/nilable
   (clojure.spec.alpha/coll-of
    :com.github.matrixnorm.serene-hello.specs/Author
    :kind
    clojure.core/sequential?)))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book.authors/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Float clojure.core/float?)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author/height_cm
  (clojure.spec.alpha/nilable :com.github.matrixnorm.serene-hello.specs/Int))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author.height_cm/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query.getAuthors/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/ID clojure.core/string?)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author/books
  (clojure.spec.alpha/nilable
   (clojure.spec.alpha/coll-of
    :com.github.matrixnorm.serene-hello.specs/Book
    :kind
    clojure.core/sequential?)))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs/Int clojure.core/integer?)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book.ISBN/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Query.getBooks/&args
  (clojure.spec.alpha/keys :opt-un [] :req-un []))

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Author/name
  :com.github.matrixnorm.serene-hello.specs/String)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book/ISBN
  :com.github.matrixnorm.serene-hello.specs/String)

(clojure.spec.alpha/def :com.github.matrixnorm.serene-hello.specs.Book/title
  :com.github.matrixnorm.serene-hello.specs/String)

(clojure.spec.alpha/def :gql/Author :com.github.matrixnorm.serene-hello.specs/Author)

(clojure.spec.alpha/def :gql/Book :com.github.matrixnorm.serene-hello.specs/Book)

(clojure.spec.alpha/def :gql/Boolean :com.github.matrixnorm.serene-hello.specs/Boolean)

(clojure.spec.alpha/def :gql/Float :com.github.matrixnorm.serene-hello.specs/Float)

(clojure.spec.alpha/def :gql/ID :com.github.matrixnorm.serene-hello.specs/ID)

(clojure.spec.alpha/def :gql/Int :com.github.matrixnorm.serene-hello.specs/Int)

(clojure.spec.alpha/def :gql/Query :com.github.matrixnorm.serene-hello.specs/Query)

(clojure.spec.alpha/def :gql/String :com.github.matrixnorm.serene-hello.specs/String)

(clojure.spec.alpha/def :gql.Author/__typename
  :com.github.matrixnorm.serene-hello.specs.Author/__typename)

(clojure.spec.alpha/def :gql.Author/books :com.github.matrixnorm.serene-hello.specs.Author/books)

(clojure.spec.alpha/def :gql.Author/height_cm
  :com.github.matrixnorm.serene-hello.specs.Author/height_cm)

(clojure.spec.alpha/def :gql.Author.__typename/&args
  :com.github.matrixnorm.serene-hello.specs.Author.__typename/&args)

(clojure.spec.alpha/def :gql.Author.books/&args
  :com.github.matrixnorm.serene-hello.specs.Author.books/&args)

(clojure.spec.alpha/def :gql.Author.height_cm/&args
  :com.github.matrixnorm.serene-hello.specs.Author.height_cm/&args)

(clojure.spec.alpha/def :gql.Author.name/&args
  :com.github.matrixnorm.serene-hello.specs.Author.name/&args)

(clojure.spec.alpha/def :gql.Book/__typename
  :com.github.matrixnorm.serene-hello.specs.Book/__typename)

(clojure.spec.alpha/def :gql.Book/authors :com.github.matrixnorm.serene-hello.specs.Book/authors)

(clojure.spec.alpha/def :gql.Book.ISBN/&args
  :com.github.matrixnorm.serene-hello.specs.Book.ISBN/&args)

(clojure.spec.alpha/def :gql.Book.__typename/&args
  :com.github.matrixnorm.serene-hello.specs.Book.__typename/&args)

(clojure.spec.alpha/def :gql.Book.authors/&args
  :com.github.matrixnorm.serene-hello.specs.Book.authors/&args)

(clojure.spec.alpha/def :gql.Book.title/&args
  :com.github.matrixnorm.serene-hello.specs.Book.title/&args)

(clojure.spec.alpha/def :gql.Query/__typename
  :com.github.matrixnorm.serene-hello.specs.Query/__typename)

(clojure.spec.alpha/def :gql.Query/getAuthors
  :com.github.matrixnorm.serene-hello.specs.Query/getAuthors)

(clojure.spec.alpha/def :gql.Query/getBooks
  :com.github.matrixnorm.serene-hello.specs.Query/getBooks)

(clojure.spec.alpha/def :gql.Query.__typename/&args
  :com.github.matrixnorm.serene-hello.specs.Query.__typename/&args)

(clojure.spec.alpha/def :gql.Query.getAuthors/&args
  :com.github.matrixnorm.serene-hello.specs.Query.getAuthors/&args)

(clojure.spec.alpha/def :gql.Query.getBooks/&args
  :com.github.matrixnorm.serene-hello.specs.Query.getBooks/&args)

(clojure.spec.alpha/def :gql.Author/name :com.github.matrixnorm.serene-hello.specs.Author/name)

(clojure.spec.alpha/def :gql.Book/ISBN :com.github.matrixnorm.serene-hello.specs.Book/ISBN)

(clojure.spec.alpha/def :gql.Book/title :com.github.matrixnorm.serene-hello.specs.Book/title)
