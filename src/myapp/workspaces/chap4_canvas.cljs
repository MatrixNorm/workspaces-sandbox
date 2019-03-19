(ns myapp.workspaces.chap4-canvas
  (:require
    [fulcro.client.cards :refer [defcard-fulcro]]
    [fulcro.client.mutations :refer [defmutation]]
    [fulcro.client.primitives :as prim :refer [defsc InitialAppState initial-state]]
    [goog.object :as gobj]
    [fulcro.client.dom :as dom]))

;; https://itnext.io/dont-use-inline-functions-or-bind-in-react-ref-callbacks-5559e4342ead

(defn log [& x] (apply js/console.log x))

(defn change-size*
  "Change the size of the canvas by some (pos or neg) amount.."
  [state-map amount]
  (let [current-size (get-in state-map [:child/by-id 0 :size])
        new-size     (+ amount current-size)]
    (assoc-in state-map [:child/by-id 0 :size] new-size)))

(defmutation ^:intern make-smaller [p]
  (action [{:keys [state]}]
          (swap! state change-size* -20)))

(defmutation ^:intern make-bigger [p]
  (action [{:keys [state]}]
          (swap! state change-size* 20)))

(defmutation ^:intern update-marker [{:keys [coords]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:child/by-id 0 :marker] coords)))


(defn event->dom-coords
  "Translate a javascript evt to a clj [x y] within the given dom element."
  [evt dom-ele]
  (let [cx (.-clientX evt)
        cy (.-clientY evt)
        BB (.getBoundingClientRect dom-ele)
        x  (- cx (.-left BB))
        y  (- cy (.-top BB))]
    [x y]))

(defn event->normalized-coords
  "Translate a javascript evt to a clj [x y] within the given dom element as normalized (0 to 1) coordinates."
  [evt dom-ele]
  (let [cx (.-clientX evt)
        cy (.-clientY evt)
        BB (.getBoundingClientRect dom-ele)
        w  (- (.-right BB) (.-left BB))
        h  (- (.-bottom BB) (.-top BB))
        x  (/ (- cx (.-left BB))
              w)
        y  (/ (- cy (.-top BB))
              h)]
    [x y]))

(defn render-hover-and-marker
  "Render the graphics in the canvas. Pass the component props and state. "
  [canvas props coords]
  (let [marker             (:marker props)
        size               (:size props)
        real-marker-coords (mapv (partial * size) marker)
        ; See HTML5 canvas docs
        ctx                (.getContext canvas "2d")
        clear              (fn []
                             (set! (.-fillStyle ctx) "white")
                             (.fillRect ctx 0 0 size size))
        drawHover          (fn []
                             (set! (.-strokeStyle ctx) "gray")
                             (.strokeRect ctx (- (first coords) 5) (- (second coords) 5) 10 10))
        drawMarker         (fn []
                             (set! (.-strokeStyle ctx) "red")
                             (.strokeRect ctx (- (first real-marker-coords) 5) (- (second real-marker-coords) 5) 10 10))]
    (.save ctx)
    (clear)
    (drawHover)
    (drawMarker)
    (.restore ctx)))

(defn place-marker
  [child evt]
  (let [canvas (gobj/get child "canvas")]
    (prim/transact! child `[(update-marker
                              {:coords ~(event->normalized-coords evt canvas)})])))

(defn hover-marker
  [child evt]
  (let [canvas         (.-canvas child)
        updated-coords (event->dom-coords evt canvas)]
    (prim/set-state! child {:coords updated-coords})
    (render-hover-and-marker canvas (prim/props child) updated-coords)))

;; UI

(defsc Child [this {:keys [id size]}]
  {:query          [:id :size :marker]
   :initial-state
     (fn [params] (merge {:id 0 :size 50 :marker [0.5 0.5]} params))
   :ident          (fn [] [:child/by-id id])
   :initLocalState
     (fn []
       (set! (.-canvasRefCallback this)
             (fn [r]
               (log "REF CALLBACK: " r)
               (set! (.-canvas this) r)))
       {:coords [-50 -50]})
   :componentDidMount
     (fn []
       (log "componentDidMount")
       (render-hover-and-marker
         (.-canvas this)
         (prim/props this)
         (prim/get-state this :coords)))
   :componentDidUpdate
     (fn [_ _]
       (log "componentDidUpdate")
       (render-hover-and-marker
         (.-canvas this)
         (prim/props this)
         (prim/get-state this :coords)))
   :shouldComponentUpdate
     (fn [next-props _]
       (let [prev-props (prim/props this)
             update? (not= prev-props next-props)]
         (log "shouldComponentUpdate: " update?)
         update?))
   :componentWillMount #(log "componentWillMount")
   :componentWillUnmount #(log "componentWillUnmount")}
  (log "RENDER")
  (dom/canvas {:width       (str size "px")
               :height      (str size "px")
               :onMouseDown (fn [evt] (place-marker this evt))
               :onMouseMove (fn [evt] (hover-marker this evt))
               :ref         (.-canvasRefCallback this)
               :style       {:border "1px solid black"}}))


(def ui-child (prim/factory Child))

(defsc Root [this {:keys [child]}]
  {:query [{:child (prim/get-query Child)}]
   :initial-state (fn [_] {:child (initial-state Child {:size 200})})}
  (dom/div
    (dom/button {:onClick #(prim/transact! this `[(make-bigger {})])} "Bigger!")
    (dom/button {:onClick #(prim/transact! this `[(make-smaller {})])} "Smaller!")
    (dom/br)
    (dom/br)
    (ui-child child)))