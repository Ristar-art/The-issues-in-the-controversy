/**
 * Sanitize Quill-specific HTML into standard HTML.
 */
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export function sanitizeQuillHtml(html) {
  if (stryMutAct_9fa48("21")) {
    {}
  } else {
    stryCov_9fa48("21");
    if (stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : stryMutAct_9fa48("22") ? html : (stryCov_9fa48("22", "23", "24"), !html)) return stryMutAct_9fa48("25") ? "Stryker was here!" : (stryCov_9fa48("25"), '');
    html = html.replace(stryMutAct_9fa48("29") ? /<span\s+class="ql-ui"[>]*><\/span>/g : stryMutAct_9fa48("28") ? /<span\s+class="ql-ui"[^>]><\/span>/g : stryMutAct_9fa48("27") ? /<span\S+class="ql-ui"[^>]*><\/span>/g : stryMutAct_9fa48("26") ? /<span\sclass="ql-ui"[^>]*><\/span>/g : (stryCov_9fa48("26", "27", "28", "29"), /<span\s+class="ql-ui"[^>]*><\/span>/g), stryMutAct_9fa48("30") ? "Stryker was here!" : (stryCov_9fa48("30"), ''));
    html = html.replace(stryMutAct_9fa48("32") ? /\S+contenteditable="false"/g : stryMutAct_9fa48("31") ? /\scontenteditable="false"/g : (stryCov_9fa48("31", "32"), /\s+contenteditable="false"/g), stryMutAct_9fa48("33") ? "Stryker was here!" : (stryCov_9fa48("33"), ''));
    html = html.replace(stryMutAct_9fa48("37") ? /<ol>([\s\s]*?)<\/ol>/g : stryMutAct_9fa48("36") ? /<ol>([\S\S]*?)<\/ol>/g : stryMutAct_9fa48("35") ? /<ol>([^\s\S]*?)<\/ol>/g : stryMutAct_9fa48("34") ? /<ol>([\s\S])<\/ol>/g : (stryCov_9fa48("34", "35", "36", "37"), /<ol>([\s\S]*?)<\/ol>/g), (_, inner) => {
      if (stryMutAct_9fa48("38")) {
        {}
      } else {
        stryCov_9fa48("38");
        const liRegex = stryMutAct_9fa48("44") ? /<li([^>]*)>([\s\s]*?)<\/li>/g : stryMutAct_9fa48("43") ? /<li([^>]*)>([\S\S]*?)<\/li>/g : stryMutAct_9fa48("42") ? /<li([^>]*)>([^\s\S]*?)<\/li>/g : stryMutAct_9fa48("41") ? /<li([^>]*)>([\s\S])<\/li>/g : stryMutAct_9fa48("40") ? /<li([>]*)>([\s\S]*?)<\/li>/g : stryMutAct_9fa48("39") ? /<li([^>])>([\s\S]*?)<\/li>/g : (stryCov_9fa48("39", "40", "41", "42", "43", "44"), /<li([^>]*)>([\s\S]*?)<\/li>/g);
        const items = stryMutAct_9fa48("45") ? ["Stryker was here"] : (stryCov_9fa48("45"), []);
        let m;
        while (stryMutAct_9fa48("47") ? (m = liRegex.exec(inner)) === null : stryMutAct_9fa48("46") ? false : (stryCov_9fa48("46", "47"), (m = liRegex.exec(inner)) !== null)) {
          if (stryMutAct_9fa48("48")) {
            {}
          } else {
            stryCov_9fa48("48");
            const attrs = m[1];
            const content = m[2];
            const typeMatch = attrs.match(stryMutAct_9fa48("50") ? /data-list="(["]*)"/ : stryMutAct_9fa48("49") ? /data-list="([^"])"/ : (stryCov_9fa48("49", "50"), /data-list="([^"]*)"/));
            const type = typeMatch ? typeMatch[1] : stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), 'ordered');
            const cleanAttrs = attrs.replace(stryMutAct_9fa48("55") ? /\s*data-list="["]*"/ : stryMutAct_9fa48("54") ? /\s*data-list="[^"]"/ : stryMutAct_9fa48("53") ? /\S*data-list="[^"]*"/ : stryMutAct_9fa48("52") ? /\sdata-list="[^"]*"/ : (stryCov_9fa48("52", "53", "54", "55"), /\s*data-list="[^"]*"/), stryMutAct_9fa48("56") ? "Stryker was here!" : (stryCov_9fa48("56"), ''));
            items.push(stryMutAct_9fa48("57") ? {} : (stryCov_9fa48("57"), {
              type,
              html: stryMutAct_9fa48("58") ? `` : (stryCov_9fa48("58"), `<li${cleanAttrs}>${content}</li>`)
            }));
          }
        }
        let result = stryMutAct_9fa48("59") ? "Stryker was here!" : (stryCov_9fa48("59"), '');
        let i = 0;
        while (stryMutAct_9fa48("62") ? i >= items.length : stryMutAct_9fa48("61") ? i <= items.length : stryMutAct_9fa48("60") ? false : (stryCov_9fa48("60", "61", "62"), i < items.length)) {
          if (stryMutAct_9fa48("63")) {
            {}
          } else {
            stryCov_9fa48("63");
            const currentType = items[i].type;
            const tag = (stryMutAct_9fa48("66") ? currentType !== 'bullet' : stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : (stryCov_9fa48("64", "65", "66"), currentType === (stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), 'bullet')))) ? stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), 'ul') : stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), 'ol');
            result += stryMutAct_9fa48("70") ? `` : (stryCov_9fa48("70"), `<${tag}>`);
            while (stryMutAct_9fa48("72") ? i < items.length || items[i].type === currentType : stryMutAct_9fa48("71") ? false : (stryCov_9fa48("71", "72"), (stryMutAct_9fa48("75") ? i >= items.length : stryMutAct_9fa48("74") ? i <= items.length : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75"), i < items.length)) && (stryMutAct_9fa48("77") ? items[i].type !== currentType : stryMutAct_9fa48("76") ? true : (stryCov_9fa48("76", "77"), items[i].type === currentType)))) {
              if (stryMutAct_9fa48("78")) {
                {}
              } else {
                stryCov_9fa48("78");
                stryMutAct_9fa48("79") ? result -= items[i].html : (stryCov_9fa48("79"), result += items[i].html);
                stryMutAct_9fa48("80") ? i-- : (stryCov_9fa48("80"), i++);
              }
            }
            result += stryMutAct_9fa48("81") ? `` : (stryCov_9fa48("81"), `</${tag}>`);
          }
        }
        return result;
      }
    });
    html = html.replace(stryMutAct_9fa48("93") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<))/g : stryMutAct_9fa48("92") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\S*(?:<|$))/g : stryMutAct_9fa48("91") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s(?:<|$))/g : stryMutAct_9fa48("90") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?!\s*(?:<|$))/g : stryMutAct_9fa48("89") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\s]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("88") ? /<div\s+class="ql-code-block-container"[^>]*>([\S\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("87") ? /<div\s+class="ql-code-block-container"[^>]*>([^\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("86") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S])<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("85") ? /<div\s+class="ql-code-block-container"[>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("84") ? /<div\s+class="ql-code-block-container"[^>]>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("83") ? /<div\S+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("82") ? /<div\sclass="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : (stryCov_9fa48("82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93"), /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g), fullMatch => {
      if (stryMutAct_9fa48("94")) {
        {}
      } else {
        stryCov_9fa48("94");
        const lines = stryMutAct_9fa48("95") ? ["Stryker was here"] : (stryCov_9fa48("95"), []);
        const lineRegex = stryMutAct_9fa48("103") ? /<div\s+class="ql-code-block"[^>]*>([\s\s]*?)<\/div>/g : stryMutAct_9fa48("102") ? /<div\s+class="ql-code-block"[^>]*>([\S\S]*?)<\/div>/g : stryMutAct_9fa48("101") ? /<div\s+class="ql-code-block"[^>]*>([^\s\S]*?)<\/div>/g : stryMutAct_9fa48("100") ? /<div\s+class="ql-code-block"[^>]*>([\s\S])<\/div>/g : stryMutAct_9fa48("99") ? /<div\s+class="ql-code-block"[>]*>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("98") ? /<div\s+class="ql-code-block"[^>]>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("97") ? /<div\S+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("96") ? /<div\sclass="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g : (stryCov_9fa48("96", "97", "98", "99", "100", "101", "102", "103"), /<div\s+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g);
        let match;
        while (stryMutAct_9fa48("105") ? (match = lineRegex.exec(fullMatch)) === null : stryMutAct_9fa48("104") ? false : (stryCov_9fa48("104", "105"), (match = lineRegex.exec(fullMatch)) !== null)) {
          if (stryMutAct_9fa48("106")) {
            {}
          } else {
            stryCov_9fa48("106");
            lines.push(match[1]);
          }
        }
        return stryMutAct_9fa48("107") ? `` : (stryCov_9fa48("107"), `<pre><code>${lines.join(stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), '\n'))}</code></pre>`);
      }
    });
    return html;
  }
}

/**
 * Convert a blocks array into HTML, resolving component references.
 */
export function blocksToHtml(blocks, components) {
  if (stryMutAct_9fa48("109")) {
    {}
  } else {
    stryCov_9fa48("109");
    if (stryMutAct_9fa48("112") ? !blocks && !Array.isArray(blocks) : stryMutAct_9fa48("111") ? false : stryMutAct_9fa48("110") ? true : (stryCov_9fa48("110", "111", "112"), (stryMutAct_9fa48("113") ? blocks : (stryCov_9fa48("113"), !blocks)) || (stryMutAct_9fa48("114") ? Array.isArray(blocks) : (stryCov_9fa48("114"), !Array.isArray(blocks))))) return stryMutAct_9fa48("115") ? "Stryker was here!" : (stryCov_9fa48("115"), '');
    return blocks.map(block => {
      if (stryMutAct_9fa48("116")) {
        {}
      } else {
        stryCov_9fa48("116");
        switch (block.type) {
          case stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), 'heading'):
            if (stryMutAct_9fa48("117")) {} else {
              stryCov_9fa48("117");
              {
                if (stryMutAct_9fa48("119")) {
                  {}
                } else {
                  stryCov_9fa48("119");
                  const level = stryMutAct_9fa48("122") ? block.level && 2 : stryMutAct_9fa48("121") ? false : stryMutAct_9fa48("120") ? true : (stryCov_9fa48("120", "121", "122"), block.level || 2);
                  const tag = stryMutAct_9fa48("123") ? `` : (stryCov_9fa48("123"), `h${level}`);
                  return stryMutAct_9fa48("124") ? `` : (stryCov_9fa48("124"), `<${tag}>${stryMutAct_9fa48("127") ? block.text && '' : stryMutAct_9fa48("126") ? false : stryMutAct_9fa48("125") ? true : (stryCov_9fa48("125", "126", "127"), block.text || (stryMutAct_9fa48("128") ? "Stryker was here!" : (stryCov_9fa48("128"), '')))}</${tag}>`);
                }
              }
            }
          case stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'text'):
            if (stryMutAct_9fa48("129")) {} else {
              stryCov_9fa48("129");
              return sanitizeQuillHtml(stryMutAct_9fa48("133") ? block.text && '' : stryMutAct_9fa48("132") ? false : stryMutAct_9fa48("131") ? true : (stryCov_9fa48("131", "132", "133"), block.text || (stryMutAct_9fa48("134") ? "Stryker was here!" : (stryCov_9fa48("134"), ''))));
            }
          case stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), 'image'):
            if (stryMutAct_9fa48("135")) {} else {
              stryCov_9fa48("135");
              if (stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : (stryCov_9fa48("137", "138"), block.src)) {
                if (stryMutAct_9fa48("139")) {
                  {}
                } else {
                  stryCov_9fa48("139");
                  const width = block.widthPercent ? stryMutAct_9fa48("140") ? `` : (stryCov_9fa48("140"), `width: ${block.widthPercent}%`) : stryMutAct_9fa48("141") ? "Stryker was here!" : (stryCov_9fa48("141"), '');
                  return stryMutAct_9fa48("142") ? `` : (stryCov_9fa48("142"), `<figure style="${width}"><img src="${block.src}" alt="${stryMutAct_9fa48("145") ? block.alt && '' : stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : (stryCov_9fa48("143", "144", "145"), block.alt || (stryMutAct_9fa48("146") ? "Stryker was here!" : (stryCov_9fa48("146"), '')))}" style="max-width:100%" /></figure>`);
                }
              }
              return stryMutAct_9fa48("147") ? "Stryker was here!" : (stryCov_9fa48("147"), '');
            }
          case stryMutAct_9fa48("149") ? "" : (stryCov_9fa48("149"), 'button'):
            if (stryMutAct_9fa48("148")) {} else {
              stryCov_9fa48("148");
              if (stryMutAct_9fa48("151") ? false : stryMutAct_9fa48("150") ? true : (stryCov_9fa48("150", "151"), block.href)) {
                if (stryMutAct_9fa48("152")) {
                  {}
                } else {
                  stryCov_9fa48("152");
                  return stryMutAct_9fa48("153") ? `` : (stryCov_9fa48("153"), `<a href="${block.href}" class="button">${stryMutAct_9fa48("156") ? block.label && 'Button' : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), block.label || (stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), 'Button')))}</a>`);
                }
              }
              return stryMutAct_9fa48("158") ? "Stryker was here!" : (stryCov_9fa48("158"), '');
            }
          case stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), 'component'):
            if (stryMutAct_9fa48("159")) {} else {
              stryCov_9fa48("159");
              {
                if (stryMutAct_9fa48("161")) {
                  {}
                } else {
                  stryCov_9fa48("161");
                  if (stryMutAct_9fa48("164") ? block.componentId || components : stryMutAct_9fa48("163") ? false : stryMutAct_9fa48("162") ? true : (stryCov_9fa48("162", "163", "164"), block.componentId && components)) {
                    if (stryMutAct_9fa48("165")) {
                      {}
                    } else {
                      stryCov_9fa48("165");
                      const component = components.find(stryMutAct_9fa48("166") ? () => undefined : (stryCov_9fa48("166"), c => stryMutAct_9fa48("169") ? c.id !== block.componentId : stryMutAct_9fa48("168") ? false : stryMutAct_9fa48("167") ? true : (stryCov_9fa48("167", "168", "169"), c.id === block.componentId)));
                      if (stryMutAct_9fa48("171") ? false : stryMutAct_9fa48("170") ? true : (stryCov_9fa48("170", "171"), component)) {
                        if (stryMutAct_9fa48("172")) {
                          {}
                        } else {
                          stryCov_9fa48("172");
                          return component.html;
                        }
                      }
                    }
                  }
                  return stryMutAct_9fa48("173") ? "Stryker was here!" : (stryCov_9fa48("173"), '');
                }
              }
            }
          case stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), 'layout'):
            if (stryMutAct_9fa48("174")) {} else {
              stryCov_9fa48("174");
              if (stryMutAct_9fa48("177") ? false : stryMutAct_9fa48("176") ? true : (stryCov_9fa48("176", "177"), block.blocks)) {
                if (stryMutAct_9fa48("178")) {
                  {}
                } else {
                  stryCov_9fa48("178");
                  const cols = stryMutAct_9fa48("181") ? block.columns && 2 : stryMutAct_9fa48("180") ? false : stryMutAct_9fa48("179") ? true : (stryCov_9fa48("179", "180", "181"), block.columns || 2);
                  const inner = blocksToHtml(block.blocks, components);
                  return stryMutAct_9fa48("182") ? `` : (stryCov_9fa48("182"), `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1rem">${inner}</div>`);
                }
              }
              return stryMutAct_9fa48("183") ? "Stryker was here!" : (stryCov_9fa48("183"), '');
            }
          default:
            if (stryMutAct_9fa48("184")) {} else {
              stryCov_9fa48("184");
              return sanitizeQuillHtml(stryMutAct_9fa48("187") ? block.text && '' : stryMutAct_9fa48("186") ? false : stryMutAct_9fa48("185") ? true : (stryCov_9fa48("185", "186", "187"), block.text || (stryMutAct_9fa48("188") ? "Stryker was here!" : (stryCov_9fa48("188"), ''))));
            }
        }
      }
    }).join(stryMutAct_9fa48("189") ? "" : (stryCov_9fa48("189"), '\n'));
  }
}