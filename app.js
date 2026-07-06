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
  var quizAnswers = {};
  var quizChecked = false;
  var practiceText = "";
  var practiceChecked = false;
  var hintsRevealed = 0;
  var helpUsed = false;

  function openQuest(id) {
    openOverlayId = id;
    quizAnswers = {};
    quizChecked = false;
    practiceText = "";
    practiceChecked = false;
    hintsRevealed = 0;
    helpUsed = false;
    render();
  }

  function closeOverlay() {
    openOverlayId = null;
    quizAnswers = {};
    quizChecked = false;
    practiceText = "";
    practiceChecked = false;
    hintsRevealed = 0;
    helpUsed = false;
    render();
  }

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
    chip.innerHTML = svgIcon("star", 14, earned ? "#d8c9a8" : "#55534d");
    var span = document.createElement("span");
    span.textContent = name;
    chip.appendChild(span);
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
        var dotIconName = status === "done" ? "check" : status === "locked" ? "lock" : q.icon;
        var dotIconColor = status === "done" ? "#7fd394" : status === "locked" ? "#55534d" : status === "active" ? "#e0a458" : "#9a978f";
        var dotEl = el("div", dotClass, svgIcon(dotIconName, status === "locked" ? 12 : 14, dotIconColor));
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
            openQuest(q.id);
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
    bossHead.appendChild(el("div", "node-dot boss", svgIcon("boss", 16, "#e07070")));
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
    var savedScroll = existing ? existing.scrollTop : 0;
    if (existing) existing.remove();
    if (!openOverlayId) return;

    var q = findQuestById(openOverlayId);
    if (!q) return;

    var overlay = el("div", "overlay open");
    overlay.id = "quest-overlay";
    var inner = el("div", "overlay-inner");

    var back = el("button", "overlay-back", "← Zurück");
    back.addEventListener("click", function () {
      closeOverlay();
    });
    inner.appendChild(back);

    var topicColor = TOPIC_COLORS[q.icon] || "#c58b4a";
    var banner = el("div", "quest-banner");
    banner.style.background = topicColor + "1f";
    banner.style.borderColor = topicColor + "55";
    banner.innerHTML =
      '<span class="banner-deco banner-deco-1" style="border-color:' + topicColor + '40"></span>' +
      '<span class="banner-deco banner-deco-2" style="border-color:' + topicColor + '30"></span>' +
      '<span class="banner-icon">' + svgIcon(q.icon, 48, topicColor, 2) + "</span>";
    inner.appendChild(banner);

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

    var isDoneForHints = state.completed.indexOf(q.id) !== -1;
    if (!isDoneForHints && q.hints && q.hints.length) {
      var hintBox = el("div", "hint-box");
      if (hintsRevealed > 0) {
        var hintList = el("div", "hint-list");
        for (var hi = 0; hi < hintsRevealed; hi++) {
          hintList.appendChild(el("p", "hint-line", "💡 " + q.hints[hi]));
        }
        hintBox.appendChild(hintList);
      }
      if (hintsRevealed < q.hints.length) {
        var hintBtn = el(
          "button",
          "hint-btn",
          hintsRevealed === 0 ? "Brauchst du Hilfe? Tipp anzeigen" : "Noch einen Tipp anzeigen"
        );
        hintBtn.addEventListener("click", function () {
          hintsRevealed += 1;
          helpUsed = true;
          renderOverlay();
        });
        hintBox.appendChild(hintBtn);
      } else {
        hintBox.appendChild(el("p", "hint-line", "💡 Das waren alle Tipps für diese Quest."));
      }
      inner.appendChild(hintBox);
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
    var hasQuiz = q.quiz && q.quiz.length > 0;
    var quizAllCorrect = false;

    if (!isDone && hasQuiz) {
      inner.appendChild(el("h2", "", "Quiz"));
      var quizWrap = el("div", "quiz-wrap");

      q.quiz.forEach(function (qq, qi) {
        var qBox = el("div", "quiz-question");
        qBox.appendChild(el("p", "quiz-q-text", (qi + 1) + ". " + qq.q));
        var optsWrap = el("div", "quiz-options");

        qq.options.forEach(function (opt, oi) {
          var label = el("label", "quiz-option");
          if (quizChecked) {
            if (oi === qq.correct) label.className += " correct";
            else if (quizAnswers[qi] === oi) label.className += " wrong";
          }
          var input = document.createElement("input");
          input.type = "radio";
          input.name = "quiz-q" + qi;
          input.value = String(oi);
          if (quizAnswers[qi] === oi) input.checked = true;
          input.addEventListener("change", function () {
            quizAnswers[qi] = oi;
            quizChecked = false;
            renderOverlay();
          });
          label.appendChild(input);
          var span = document.createElement("span");
          span.textContent = opt;
          label.appendChild(span);
          optsWrap.appendChild(label);
        });

        qBox.appendChild(optsWrap);
        if (quizChecked && quizAnswers[qi] !== qq.correct) {
          qBox.appendChild(el("p", "quiz-explain", qq.explain || ""));
        }
        quizWrap.appendChild(qBox);
      });

      inner.appendChild(quizWrap);

      var allAnswered = q.quiz.every(function (_, qi) { return quizAnswers[qi] !== undefined; });
      quizAllCorrect = q.quiz.every(function (qq, qi) { return quizAnswers[qi] === qq.correct; });

      if (!(quizChecked && quizAllCorrect)) {
        var checkBtn = el("button", "quiz-check-btn", quizChecked ? "Nochmal prüfen" : "Antworten prüfen");
        checkBtn.disabled = !allAnswered;
        checkBtn.addEventListener("click", function () {
          quizChecked = true;
          renderOverlay();
        });
        inner.appendChild(checkBtn);
      } else {
        inner.appendChild(el("p", "quiz-passed", "✓ Quiz bestanden."));
      }
    }

    var hasPractice = !isDone && !!q.practiceCheck;
    var practiceOk = false;

    if (hasPractice) {
      inner.appendChild(el("h2", "", "Praxis-Check"));
      var pc = q.practiceCheck;
      if (pc.instructions) inner.appendChild(el("p", "theory", pc.instructions));

      var textarea = document.createElement("textarea");
      textarea.className = "practice-input";
      textarea.placeholder = pc.placeholder || "Terminal-Ausgabe hier einfügen ...";
      textarea.value = practiceText;
      textarea.addEventListener("input", function (e) {
        practiceText = e.target.value;
      });
      inner.appendChild(textarea);

      var checkPracticeBtn = el("button", "quiz-check-btn", "Ausgabe prüfen");
      checkPracticeBtn.addEventListener("click", function () {
        practiceChecked = true;
        renderOverlay();
      });
      inner.appendChild(checkPracticeBtn);

      if (practiceChecked) {
        var resultsWrap = el("div", "practice-results");

        var looksLikeCommand = /(^|\s)(mkdir|cd|ls|pwd|echo|cat|rm)\b/i.test(practiceText.trim()) || practiceText.indexOf("&&") !== -1;
        if (looksLikeCommand) {
          resultsWrap.appendChild(
            el(
              "p",
              "practice-check-line fail",
              "✕ Das sieht nach dem eingegebenen Befehl aus, nicht nach der Ausgabe. Führe den Befehl im Terminal aus und kopiere das Ergebnis, das danach in einer neuen Zeile erscheint - nicht den Befehl selbst."
            )
          );
        }

        var allPass = true;
        pc.checks.forEach(function (c) {
          var pass = c.regex.test(practiceText.trim());
          if (!pass) allPass = false;
          var line = el(
            "p",
            "practice-check-line " + (pass ? "pass" : "fail"),
            (pass ? "✓ " : "✕ ") + (pass ? c.successHint || "Erkannt" : c.hint)
          );
          resultsWrap.appendChild(line);
        });
        inner.appendChild(resultsWrap);
        practiceOk = allPass;
        if (allPass) inner.appendChild(el("p", "quiz-passed", "✓ Praxis-Check bestanden."));
      }
    }

    var quizOk = !hasQuiz || (quizChecked && quizAllCorrect);
    var practiceGateOk = !hasPractice || practiceOk;

    if (isDone) {
      inner.appendChild(el("div", "done-note", "✓ Bereits erledigt."));
    } else if (quizOk && practiceGateOk) {
      var btn = el("button", "complete-btn", "Als erledigt markieren (+" + q.xp + " XP)");
      btn.addEventListener("click", function () {
        completeQuest(q.id);
      });
      inner.appendChild(btn);
    } else {
      var missing = [];
      if (!quizOk) missing.push("Quiz noch nicht richtig beantwortet");
      if (!practiceGateOk) missing.push("Praxis-Check noch nicht bestanden");
      inner.appendChild(el("p", "quiz-locked-note", missing.join(" · ") + " - erst dann kannst du abschließen."));
    }

    overlay.appendChild(inner);
    document.body.appendChild(overlay);
    overlay.scrollTop = savedScroll;
  }

  function completeQuest(id) {
    if (state.completed.indexOf(id) !== -1) return;
    var q = findQuestById(id);
    if (!q) return;
    var before = level(state.xp);
    var bonusXp = !helpUsed;
    var xpGain = bonusXp ? Math.round(q.xp * 1.5) : q.xp;
    state.completed.push(id);
    state.xp += xpGain;
    var after = level(state.xp);
    var xpNote = bonusXp
      ? "+" + xpGain + " XP (inkl. 50% Bonus, da ohne Hilfe geloest)"
      : "+" + xpGain + " XP";
    state._levelUpMessage = after > before ? "Level up! Jetzt Level " + after + ". " + xpNote : xpNote;
    saveState(state);
    openOverlayId = null;
    quizAnswers = {};
    quizChecked = false;
    practiceText = "";
    practiceChecked = false;
    hintsRevealed = 0;
    helpUsed = false;
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
