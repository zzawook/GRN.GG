export default function queueId(id) {
    if (id == 0 || id == null) {
        return 'Custom Game'
    }
    else if (id == 2 || id == 430) {
        return 'Normal Blind'
    }
    else if (id == 4 || id == 420) {
        return 'Ranked Draft'
    }
    else if (id == 440) { 
        return 'Ranked Flex'
    }
    else if (id == 7 || id == 32 || id == 33) {
        return 'Co-op vs AI'
    }
    else if (id == 65 || id == 450 || id == 67 || id == 72 || id ==73) {
        return 'Twisted Treeline'
    }
    else if (id == 2000) {
        return 'Tutorial 1'
    }
    else if (id == 1400) {
        return 'Ult Spellbook'
    }
    else if (id == 1300 || id == 1200) {
        return 'Nexus Blitz'
    }
    else if (id == 2010) {
        return 'Tutorial 2'
    }
    else if (id == 2020) {
        return 'Tutorial 3'
    }
    else if (id == 1020) {
        return 'One for All'
    }
    else if (id == 1010) {
        return 'Snow ARURF'
    }
    else if (id == 850 || id == 840 || id == 830 || id == 800 || id == 810 || id == 820) {
        return 'Co-op vs AI'
    }
}