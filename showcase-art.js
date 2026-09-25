/* Static markup for the CSS-drawn showcase device illustrations. No logic, no build step. */

window.SHOWCASE_ART = {
  'life-os':
    '<div class="device device--phone art art--life-os" aria-hidden="true">' +
      '<div class="device__notch"></div>' +
      '<div class="device__screen">' +
        '<div class="device__row">' +
          '<div class="device__row-dot"></div>' +
          '<div class="device__row-lines">' +
            '<div class="device__row-line"></div>' +
            '<div class="device__row-line device__row-line--short"></div>' +
          '</div>' +
        '</div>' +
        '<div class="device__row device__row--active">' +
          '<div class="device__row-dot"></div>' +
          '<div class="device__row-lines">' +
            '<div class="device__row-line"></div>' +
            '<div class="device__row-line device__row-line--short"></div>' +
          '</div>' +
        '</div>' +
        '<div class="device__row">' +
          '<div class="device__row-dot"></div>' +
          '<div class="device__row-lines">' +
            '<div class="device__row-line"></div>' +
            '<div class="device__row-line device__row-line--short"></div>' +
          '</div>' +
        '</div>' +
        '<div class="device__arrow">&#8595;</div>' +
        '<div class="device__task">' +
          '<div class="device__check">&#10003;</div>' +
          '<div class="device__task-lines">' +
            '<div class="device__task-line"></div>' +
            '<div class="device__task-line device__task-line--short"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>',

  'laz-store':
    '<div class="device device--phone art art--laz-store" aria-hidden="true">' +
      '<div class="device__notch"></div>' +
      '<div class="device__screen">' +
        '<div class="device__viewfinder">' +
          '<div class="device__corner device__corner--tl"></div>' +
          '<div class="device__corner device__corner--tr"></div>' +
          '<div class="device__corner device__corner--bl"></div>' +
          '<div class="device__corner device__corner--br"></div>' +
          '<div class="device__part"></div>' +
        '</div>' +
        '<div class="device__result">' +
          '<div class="device__result-dot"></div>' +
          '<div class="device__result-line"></div>' +
        '</div>' +
      '</div>' +
    '</div>',

  brewit:
    '<div class="device device--browser art art--brewit" aria-hidden="true">' +
      '<div class="device__chrome">' +
        '<div class="device__dot"></div>' +
        '<div class="device__dot"></div>' +
        '<div class="device__dot"></div>' +
        '<div class="device__bar"></div>' +
      '</div>' +
      '<div class="device__screen">' +
        '<div class="device__title"></div>' +
        '<div class="device__params">' +
          '<div class="device__param">' +
            '<div class="device__param-label"></div>' +
            '<div class="device__param-track"><div class="device__param-fill" style="width:70%"></div></div>' +
          '</div>' +
          '<div class="device__param">' +
            '<div class="device__param-label"></div>' +
            '<div class="device__param-track"><div class="device__param-fill" style="width:55%"></div></div>' +
          '</div>' +
          '<div class="device__param">' +
            '<div class="device__param-label"></div>' +
            '<div class="device__param-track"><div class="device__param-fill" style="width:82%"></div></div>' +
          '</div>' +
          '<div class="device__param">' +
            '<div class="device__param-label"></div>' +
            '<div class="device__param-track"><div class="device__param-fill" style="width:40%"></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="device__steps">' +
          '<div class="device__step"><div class="device__step-num">1</div><div class="device__step-line"></div></div>' +
          '<div class="device__step"><div class="device__step-num">2</div><div class="device__step-line"></div></div>' +
          '<div class="device__step"><div class="device__step-num">3</div><div class="device__step-line"></div></div>' +
        '</div>' +
      '</div>' +
    '</div>'
};
