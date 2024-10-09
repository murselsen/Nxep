const { ipcRenderer } = require("electron");

$(() => {
  try {
    const elements = {
      activePageTitle: $("#activePageTitle"),
      activeProfileDisplayName: $("#activeProfileDisplayName"),
      activeProfileFilePath: $("#activeProfileFilePath"),
      aboutProfileName: $("#aboutProfileName"),
      aboutCompanyName: $("#aboutCompanyName"),
      aboutGender: $("#aboutGender"),
      aboutBrand: $("#aboutBrand"),
      aboutCreationTime: $("#aboutCreationTime"),
      aboutSaveTime: $("#aboutSaveTime"),
      aboutWotStatus: $("#aboutWotStatus"),
      aboutOnlineUserName: $("#aboutOnlineUserName"),
      aboutOnlinePassword: $("#aboutOnlinePassword"),
      aboutDiscovery: $("#aboutDiscovery"),
      aboutDistance: $("#aboutDistance"),
      aboutStats: $("#aboutStats"),
      aboutProfileSaveTable: $("#aboutProfileSaveTable"),
    };
    let displayNameValue = new URLSearchParams(document.location.search).get(
      "displayName"
    );
    console.log("Display Name:", displayNameValue);

    if (displayNameValue === "" || displayNameValue === " ") {
      return false;
    }

    ipcRenderer
      .invoke("getProfileData", { displayNameValue: displayNameValue })
      .then((data) => {
        let result = data.profile;
        console.log("", result);
        document.title += "\n" + result.profileDetail.profile_name;
        elements.activePageTitle.html(
          `<b>${result.profileDetail.profile_name}</b>`
        );
        elements.activeProfileDisplayName.html(
          `<b>${result.profileDetail.profile_name}</b>`
        );
        elements.activeProfileFilePath.text(result.profileFilePath);
        elements.aboutCreationTime.text(
          new Date(result.profileDetail.creation_time * 1000).toLocaleString(
            "en-GB",
            {
              timeZone: "UTC",
            }
          )
        );
        elements.aboutSaveTime.text(
          new Date(result.profileDetail.save_time * 1000).toLocaleString(
            "en-GB",
            {
              timeZone: "UTC",
            }
          )
        );
        elements.aboutProfileName.text(result.profileDetail.profile_name);
        elements.aboutCompanyName.text(result.profileDetail.company_name);
        elements.aboutGender.text(
          result.profileDetail.male ? "Erkek" : "Kadın"
        );

        elements.aboutBrand.text(
          data.trucks[result.profileDetail.brand.toLocaleString()]
        );

        if (result.profileDetail.online_user_name !== "") {
          elements.aboutWotStatus.text("Aktif");
          console.log("Wot Status Badge:", $("aboutWotStatus").class);
          elements.aboutWotStatus.removeClass("bg-danger");
          elements.aboutWotStatus.addClass("bg-success");
        } else {
          elements.aboutWotStatus.text("Devre Dışı");
        }

        elements.aboutOnlineUserName.text(
          result.profileDetail.online_user_name
        );
        elements.aboutOnlinePassword.text(
          result.profileDetail.online_password.split().fill("*")
        );

        elements.aboutDiscovery.text(result.profileDetail.cached_discovery);
        elements.aboutDistance.text(
          result.profileDetail.cached_distance + " Km"
        );
        elements.aboutStats.text(result.profileDetail.cached_stats);

        result.saves.forEach((save) => {
          let saveCard = `
              <div class="col-md-6 col-lg-4">
                              <div class="card pt-3 px-4 shadow-lg border-4 bg-gradient border-top-0 border-start-0 border-end-0 border-success">
                                <div class="card-body ">
                                  <h5 class="card-title"><i class="bx bxs-truck"></i> ${
                                    save.saveDetail.name !== '""'
                                      ? save.saveDetail.name
                                      : save.displayName
                                  }</h5>
                                  <p class="card-text">
                                    <i class="bx bx-timer me-1 d-inline fw-light"></i>
                                    <b> Son Kayıt Zamanı:</b>
                                     ${new Date(
                                       save.saveDetail.file_time * 1000
                                     ).toLocaleString("en-GB", {
                                       timeZone: "UTC",
                                     })}
                                     <span class="badge bg-primary mx-2">${
                                       save.saveDetail.file_time
                                     }</span>
                                  </p>
                                </div>
                                <div class="card-footer pt-0 d-flex justify-content-end">
                                  <a href="#" class="card-link btn btn-danger">Sil</a>
                                  <a href="localSaveDetailWin.html?profileDisplayName=${
                                    result.displayName
                                  }&saveDisplayName=${
            save.displayName
          }" class="card-link btn btn-success">Git</a>
                                </div>
                              </div>
                            </div>`;

          elements.aboutProfileSaveTable.append(saveCard);
        });

        $("#codeData").text(JSON.stringify(result.profileDetail));
      });
  } catch (error) {
    console.error(error);
  }
});
