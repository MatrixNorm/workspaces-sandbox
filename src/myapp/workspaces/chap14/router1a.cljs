(ns myapp.workspaces.chap14.router1a
  (:require [fulcro.client.routing :as r :refer-macros [defsc-router]]
            [fulcro.client.dom :as dom]
            [fulcro.client :as fc]
            [fulcro.client.data-fetch :as df]
            [fulcro.client.primitives :as prim :refer [defsc]]
            [fulcro.client.mutations :as m]))


(defsc Index [this {:keys [db/id router/page]}]
  {:query         [:db/id :router/page]
   :ident         (fn [] [page id])                         ; IMPORTANT! Look up both things, don't use the shorthand for idents on screens!
   :initial-state {:db/id 1 :router/page :PAGE/index}}
  (dom/div nil "Index Page"))

(defsc Settings [this {:keys [db/id router/page]}]
  {:query         [:db/id :router/page]
   :ident         (fn [] [page id])
   :initial-state (fn [p]
                    (prn :222)
                    {:db/id 1 :router/page :PAGE/settings})}
  (dom/div "Settings Page"))

(defsc RootRouter-Union [this {:keys [router/page db/id]}]
  {:ident (fn [] [page id])
   :initial-state (fn [params] (prim/get-initial-state Index params))
   :query (fn
            []
            {:PAGE/index (prim/get-query Index),
             :PAGE/settings (prim/get-query Settings)})}
  (let
    [props (prim/props this)
     x (first (prim/get-ident this props))]
    (prn :333 x)
    (case
      x
      :PAGE/index
      ((prim/factory Index) props)
      :PAGE/settings
      ((prim/factory Settings) props)
      (let [this this] (dom/div "Bad route")))))

(def ui-RootRouter-Union (prim/factory RootRouter-Union))

(defsc RootRouter [this {:keys [router/page db/id]}]
  {:default-route Index,
   :ident (fn [] [:fulcro.client.routing.routers/by-id :root/router]),
   :initial-state (fn
                    [p]
                    {:fulcro.client.routing/id :root/router
                     :fulcro.client.routing/current-route (prim/get-initial-state
                                                            RootRouter-Union
                                                            p)})
   :query (fn
            []
            [:fulcro.client.routing/id
             {:fulcro.client.routing/current-route (prim/get-query RootRouter-Union)}])}
  (let
    [x (prim/get-computed this)
     y    (:fulcro.client.routing/current-route (prim/props this))
     z (prim/computed y x)]
    (ui-RootRouter-Union z)))

(def ui-root-router (prim/factory RootRouter))

(defsc Root [this {:keys [router]}]
  {:initial-state (fn [p] {:router (prim/get-initial-state RootRouter {})})
   :query         [{:router (prim/get-query RootRouter)}]}
  (prn :111 (prim/get-initial-state this {}))
  (dom/div
    (dom/a {:onClick #(prim/transact! this
                                      `[(r/set-route {:router :root/router
                                                      :target [:PAGE/index 1]})])} "Index") " | "
    (dom/a {:onClick #(prim/transact! this
                                      `[(r/set-route {:router :root/router
                                                      :target [:PAGE/settings 1]})])} "Settings")
    (ui-root-router router)))