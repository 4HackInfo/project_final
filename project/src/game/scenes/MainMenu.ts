import { Scene, VERSION } from 'phaser';

// Helpers
import getInitialGameStage from '@game/common/helpers/getInitialGameStage';

// Managers
import { SaveGameManager } from '@game/managers/SaveGameManager';

// Enums
import { LOCAL_STORAGE_KEYS_ENUM } from '@game/common/enums/LocalStorageKeysEnum';

/**
 * The menu screen to choose any option to start the game
 */
export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    // Change backgound color to black
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor('#000000');

    // Add a serie of images and texts with different locations (X, Y) and styles
    this.add
      .sprite(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 80,
        'menu-title'
      )
      .setScale(2.4);

    const startButton = this.add
      .text(
        this.cameras.main.centerX - 180,
        this.cameras.main.centerY + 180,
        'START'
      )
      .setFontFamily('"BitBold", "Tahoma"')
      .setFontSize(20)
      .setColor('white')
      .setStroke('black', 2.5)
      .setInteractive({ useHandCursor: true })
      // UI effects
      .on(
        Phaser.Input.Events.POINTER_OVER,
        () => {
          startButton.setFontSize(21).setColor('#bdbd16');
          
        },
        this
      )
      .on(
        Phaser.Input.Events.POINTER_OUT,
        () => {
          startButton.setFontSize(20).setColor('white');
  
          const border = this.add.graphics();
          border.lineStyle(2, 0xffffff, 1);
          border.strokeRoundedRect(
          startButton.x - 10,
          startButton.y - 5,
          startButton.width + 20,
          startButton.height + 10,
          10
  );
        },
        this
      )
      // Event to start a new game
      .on(
        Phaser.Input.Events.POINTER_DOWN,
        () => {
          this.sound.stopAll();

          const stageBomberman = getInitialGameStage();

          this.scene.start('ChangeStage', stageBomberman);
        },
        this
      );

    const continueButton = this.add
      .text(
        this.cameras.main.centerX + 50,
        this.cameras.main.centerY + 180,
        'CONTINUE'
      )
      .setFontFamily('"BitBold", "Tahoma"')
      .setFontSize(20)
      .setColor('white')
      .setStroke('black', 2.5)
      .setInteractive({ useHandCursor: true })
      .on(
        Phaser.Input.Events.POINTER_OVER,
        () => {
          continueButton.setFontSize(21).setColor('#bdbd16');

          const border = this.add.graphics();
          border.lineStyle(2, 0xffffff, 1);
          border.strokeRoundedRect(
          continueButton.x - 10,
          continueButton.y - 5,
          continueButton.width + 20,
          continueButton.height + 10,
          10
      )},
        this
      )
      .on(
        Phaser.Input.Events.POINTER_OUT,
        () => {
          continueButton.setFontSize(20).setColor('white');
        },
        this
      )
      .on(
        Phaser.Input.Events.POINTER_DOWN,
        () => {
          const state = SaveGameManager.getLoadedGame();

          if (state) {
            this.scene.start('ChangeStage', state.gameStage);
          }
        },
        this
      );

    this.sound.play('menu-audio', { loop: true, volume: 0.5 });
  }
}
