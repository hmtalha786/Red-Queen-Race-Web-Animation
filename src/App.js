import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    setTimeout(() => {
      const yay = document.querySelector(".yay");

      const minusButton = document.querySelector(".minus");
      const plusButton = document.querySelector(".plus");

      if (yay.animate) {
        var animation = yay.animate(
          [
            { transform: "rotate(0deg) translateX(0vmin)" },
            { transform: "rotate(2880deg) translateX(40vmin)" },
          ],
          {
            iterations: Infinity,
            duration: 10000,
            easing: "ease-in-out",
            direction: "alternate",
            composite: "add",
          }
        );

        if (animation.effect && animation.effect.composite === "add") {
          document.documentElement.classList.add("supports-composite-add");

          plusButton.addEventListener("click", (e) => addTranslateX(delta));
          minusButton.addEventListener("click", (e) => addTranslateX(-delta));
        }
      }

      const originalRadius = 40;
      let radius = originalRadius;
      var delta = 2;

      function addTranslateX(amount) {
        radius = radius + amount;
        const anim = yay.animate(
          [
            { transform: "translateX(0vmin)" },
            { transform: `translateX(${amount}vmin)` },
          ],
          {
            iterations: 1,
            duration: 1000,
            easing: "ease-in-out",
            fill: "forwards",
            composite: "add",
          }
        );

        if (anim.persist) {
          anim.persist();
        }

        updateReference();
      }

      const guide = document.querySelector(".guide");
      const from = document.querySelector(".from");
      const to = document.querySelector(".to");

      function updateReference() {
        guide.animate([{ width: `${radius * 2}vmin` }], {
          iterations: 1,
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });

        from.textContent = radius - originalRadius;
        to.textContent = radius;

        if (radius <= 0) {
          minusButton.setAttribute("disabled", "disabled");
        } else {
          minusButton.removeAttribute("disabled");
        }
      }
    }, 1000);
  }, []);

  return (
    <div className="App">
      <aside className="guide"></aside>

      <div className="yay"></div>

      <footer className="footer">
        <button className="button minus">Close</button>
        <button className="button plus">Apart</button>

        <p className="message">
          Use above buttons to make lines closer or appart.
        </p>
        <div>
          <p>
            <code className="code">
              transform: rotate(0deg) translateX(<span className="from">0</span>
              vmin)
            </code>
          </p>
          <p>
            <code>
              transform: rotate(2880deg) translateX(
              <span className="to">40</span>vmin)
            </code>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
