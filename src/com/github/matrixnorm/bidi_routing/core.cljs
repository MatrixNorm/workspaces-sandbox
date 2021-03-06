(ns com.github.matrixnorm.bidi-routing.core
  (:require [reagent.core :as r]
            [bidi.bidi :as bidi]
            [pushy.core :as pushy]))

(declare app-state)

(def routes-table
  ["/" {"" :route/home
        "sports" :route/sports
        "pol" :route/pol
        "random" :route/random
        true :route/err404}])

(def url-for (partial bidi/path-for routes-table))

(defmulti page-view identity)

(defmethod page-view :route/home []
  [:h2 "Home"])

(defmethod page-view :route/sports []
  [:h2 "Sports"])

(defmethod page-view :route/pol []
  [:h2 "Politics"])

(defmethod page-view :route/random []
  [:h2 "Random"])

(defmethod page-view :route/err404 []
  [:h2 "404"])

(defn ui-footer []
  (let [css {:background-color "#20b2aa"
             :margin           0
             :padding          10}]
    [:p {:style css} "Footer"]))

(defn ui-navigation []
  (fn []
    (let [ul-css {:list-style "none"}
          li-css {:display      "inline-block"
                  :margin-right 10}
          ui-item (fn [route text]
                    [:li {:style li-css}
                     [:a {:href (url-for route)} text]])
          current-route (:current-route @app-state)]
     [:ul {:style ul-css}
      (ui-item :route/home "Home")
      (ui-item :route/sports "Sports")
      (ui-item :route/pol "Politics")
      (ui-item :route/random "Random")])))

(defn ui-main []
  (fn []
    [:div
     [ui-navigation]
     [:div [page-view (:current-route @app-state)]]
     [ui-footer]]))


(defn dispatch-route [matched-route]
  (swap! app-state assoc :current-route (matched-route :handler))
  (js/console.log app-state))


(defonce app-state
         (r/atom {:current-route :route/home}))

(defonce html5-history
         (pushy/pushy dispatch-route
                      (partial bidi/match-route routes-table)))

(pushy/start! html5-history)

(r/render [ui-main]
          (js/document.getElementById "app"))