(ns myapp.workspaces.chap14.main
  (:require [nubank.workspaces.core :as ws]
            [nubank.workspaces.model :as wsm]
            [nubank.workspaces.card-types.fulcro :as ct.fulcro]
            [nubank.workspaces.lib.fulcro-portal :as f.portal]
            [myapp.workspaces.chap14.router1 :as router1]
            [myapp.workspaces.chap14.router1a :as router1a]))


(ws/defcard router1-card
  (ct.fulcro/fulcro-card
    {::f.portal/root router1/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console app))}}))

(ws/defcard router1a-card
  (ct.fulcro/fulcro-card
    {::f.portal/root router1a/Root
     ::f.portal/wrap-root? false

     ::f.portal/app
     {:client-did-mount (fn [app] (.log js/console app))}}))