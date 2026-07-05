(function () {
  "use strict";

  var STORAGE_KEY = "it-lernprogramm-state-v1";

  var LOCKED_BADGES = [
    { id: "terminal-neuling", name: "Terminal-Neuling" },
    { id: "pfad-finder", name: "Pfad-Finder" },
    { id: "sieben-tage-streak", name: "7-Tage-Streak" }
  ];

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  var state = loadState();
  var openOverlayId = null;

  function level(xp) {
    return Math.floor(xp / 100) + 1;
  }

  function currentRank(xp) {
    for (var i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].xpFrom && xp <= RANKS[i].xpTo) return RANKS[i];
    }
    return RANKS[RANKS.length - 1];
  }

  function allBronzeQuests() {
    var list = [];
    RANKS[0].weeks.forEach(function (w) {
      w.quests.forEach(function (q) {
        list.push(q);
      });
    });
    return list;
  }

  function questStatus(q, orderedList) {
    if (state.completed.indexOf(q.id) !== -1) return "done";
    var firstOpen = null;
    for (var i = 0; i < orderedList.length; i++) {
      if (state.completed.indexOf(orderedList[i].id) === -1) {
        firstOpen = orderedList[i].id;
        break;
      }
    }
    return q.id === firstOpen ? "active" : "locked";
  }

  function iconSvg(name) {
    return "";
  }

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderBadgeChip(name, earned) {
    var chip = el("div", "badge-chip" + (earned ? "" : " locked"));
    chip.textContent = (earned ? "★ " : "– ") + name;
    return chip;
  }

  function render() {
    var app = document.getElementById("app");
    app.innerHTML = "";

    var xp = state.xp;
    var lvl = level(xp);
    var rank = currentRank(xp);
    var xpInLevel = xp % 100;

    var header = el("div", "header");
    var who = el("div", "who");
    var avatar = el("div", "avatar", initials(state.name));
    var whoText = el("div", "", "");
    whoText.appendChild(el("p", "name", state.name));
    whoText.appendChild(el("p", "rank", "Rang " + rank.name + " · Level " + lvl));
    who.appendChild(avatar);
    who.appendChild(whoText);
    var streak = el("div", "streak", "🔥 " + state.streak + " Woche" + (state.streak === 1 ? "" : "n"));
    header.appendChild(who);
    header.appendChild(streak);
    app.appendChild(header);

    var xpWrap = el("div", "xp-wrap");
    var xpLabels = el("div", "xp-labels");
    xpLabels.appendChild(el("span", "", "XP"));
    xpLabels.appendChild(el("span", "", xp + " (" + xpInLevel + "/100 bis Level " + (lvl + 1) + ")"));
    xpWrap.appendChild(xpLabels);
    var track = el("div", "xp-bar-track");
    var fill = el("div", "xp-bar-fill");
    fill.style.width = xpInLevel + "%";
    track.appendChild(fill);
    xpWrap.appendChild(track);
    app.appendChild(xpWrap);

    if (state._levelUpMessage) {
      var toast = el("div", "levelup-toast", "★ " + state._levelUpMessage);
      app.appendChild(toast);
    }

    app.appendChild(el("p", "section-label", "Badges"));
    var badgesRow = el("div", "badges-row");
    state.badges.forEach(function (b) {
      badgesRow.appendChild(renderBadgeChip(b.name, true));
    });
    LOCKED_BADGES.forEach(function (b) {
      var already = state.badges.some(function (x) { return x.id === b.id; });
      if (!already) badgesRow.appendChild(renderBadgeChip(b.name, false));
    });
    app.appendChild(badgesRow);

    RANKS.forEach(function (r) {
      app.appendChild(renderRankBlock(r));
    });

    renderOverlay();
  }

  function initials(name) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  function renderRankBlock(rank) {
    var block = el("div", "rank-block");
    var titleRow = el("div", "rank-title");
    var dot = el("span", "rank-dot");
    dot.style.background = rank.color;
    titleRow.appendChild(dot);
    titleRow.appendChild(el("p", "rank-name", rank.name));
    block.appendChild(titleRow);
    block.appendChild(el("p", "rank-subtitle", rank.subtitle));

    if (rank.locked) {
      var gate = el("div", "rank-gate");
      gate.appendChild(el("p", "lock-line", "🔒 Schaltet sich frei nach: " + rank.unlockCondition));
      var ul = el("ul", "");
      rank.themes.forEach(function (t) {
        ul.appendChild(el("li", "", t));
      });
      gate.appendChild(ul);
      block.appendChild(gate);
      return block;
    }

    var ordered = allBronzeQuests();
    var timeline = el("div", "timeline");
    timeline.appendChild(el("div", "timeline-line"));

    rank.weeks.forEach(function (w) {
      if (w.quests.length === 0) {
        timeline.appendChild(el("p", "week-placeholder", "Woche " + w.week + " – " + w.title + " (wird freigeschaltet)"));
        return;
      }
      w.quests.forEach(function (q) {
        var status = questStatus(q, ordered);
        var node = el("div", "node" + (status === "locked" ? " disabled" : ""));
        var dotClass = "node-dot" + (status === "done" ? " done" : status === "active" ? " active" : "");
        var dotEl = el("div", dotClass, status === "done" ? "✓" : (q.icon === "flag" ? "⚑" : "•"));
        node.appendChild(dotEl);
        var titleClass = "node-title" + (status === "done" ? " done" : status === "locked" ? " locked" : "");
        node.appendChild(el("p", titleClass, q.title));
        if (status === "active") {
          node.appendChild(el("p", "node-meta", "aktuell · " + q.xp + " XP"));
        } else if (status === "locked") {
          node.appendChild(el("p", "node-meta", q.xp + " XP"));
        }
        if (status !== "locked") {
          node.addEventListener("click", function () {
            openOverlayId = q.id;
            render();
          });
        }
        timeline.appendChild(node);
      });
    });

    block.appendChild(timeline);

    var total = ordered.length;
    var done = ordered.filter(function (q) { return state.completed.indexOf(q.id) !== -1; }).length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    var bossCard = el("div", "boss-card");
    var bossHead = el("div", "boss-head");
    bossHead.appendChild(el("div", "node-dot boss", "⚔"));
    var bossText = el("div", "");
    bossText.appendChild(el("p", "boss-title", "Boss-Fight: " + rank.boss.title));
    bossText.appendChild(el("p", "boss-desc", rank.boss.description));
    bossHead.appendChild(bossText);
    bossCard.appendChild(bossHead);
    var track = el("div", "xp-bar-track");
    var fill = el("div", "xp-bar-fill");
    fill.style.width = pct + "%";
    track.appendChild(fill);
    bossCard.appendChild(track);
    bossCard.appendChild(el("p", "node-meta", done + "/" + total + " Quests dieser Woche(n) erledigt"));
    block.appendChild(bossCard);

    return block;
  }

  function findQuestById(id) {
    var found = null;
    allBronzeQuests().forEach(function (q) {
      if (q.id === id) found = q;
    });
    return found;
  }

  function renderOverlay() {
    var existing = document.getElementById("quest-overlay");
    if (existing) existing.remove();
    if (!openOverlayId) return;

    var q = findQuestById(openOverlayId);
    if (!q) return;

    var overlay = el("div", "overlay open");
    overlay.id = "quest-overlay";
    var inner = el("div", "overlay-inner");

    var back = el("button", "overlay-back", "← Zurück");
    back.addEventListener("click", function () {
      openOverlayId = null;
      render();
    });
    inner.appendChild(back);

    inner.appendChild(el("h1", "", q.title));
    inner.appendChild(el("p", "overlay-xp", q.xp + " XP" + (q.reward ? " · " + q.reward : "")));

    if (q.theory) {
      inner.appendChild(el("h2", "", "Theorie"));
      inner.appendChild(el("p", "theory", q.theory));
    }

    if (q.practice && q.practice.length) {
      inner.appendChild(el("h2", "", "Praxis"));
      var ol = el("ol", "");
      q.practice.forEach(function (step) {
        ol.appendChild(el("li", "", step));
      });
      inner.appendChild(ol);
    }

    if (q.selfcheck && q.selfcheck.length) {
      inner.appendChild(el("h2", "", "Selbstcheck"));
      var ul = el("ul", "");
      q.selfcheck.forEach(function (question) {
        ul.appendChild(el("li", "", question));
      });
      inner.appendChild(ul);
    }

    var isDone = state.completed.indexOf(q.id) !== -1;
    if (isDone) {
      inner.appendChild(el("div", "done-note", "✓ Bereits erledigt."));
    } else {
      var btn = el("button", "complete-btn", "Als erledigt markieren (+" + q.xp + " XP)");
      btn.addEventListener("click", function () {
        completeQuest(q.id);
      });
      inner.appendChild(btn);
    }

    overlay.appendChild(inner);
    document.body.appendChild(overlay);
  }

  function completeQuest(id) {
    if (state.completed.indexOf(id) !== -1) return;
    var q = findQuestById(id);
    if (!q) return;
    var before = level(state.xp);
    state.completed.push(id);
    state.xp += q.xp;
    var after = level(state.xp);
    state._levelUpMessage = after > before ? "Level up! Jetzt Level " + after + "." : null;
    saveState(state);
    openOverlayId = null;
    render();
    if (state._levelUpMessage) {
      setTimeout(function () {
        state._levelUpMessage = null;
        saveState(state);
      }, 4000);
    }
  }

  render();
})();
